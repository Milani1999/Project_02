import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import axios from 'axios';

import { createEventId } from '../data/index';
import useCalendar from '../store/Cal';

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupStatus, setPopupStatus] = useState(null);

  useEffect(() => {
    // Function to fetch events from backend and set them in state
    async function fetchEvents() {
      try {
        const response = await axios.get('/api/events');
        setCurrentEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }

   
    fetchEvents();
  }, []); // Empty dependency array ensures the effect runs only once

  const showPopup = (message, status) => {
    setPopupMessage(message);
    setPopupStatus(status);
    setTimeout(() => {
      setPopupMessage('');
      setPopupStatus(null);
    }, 3000);
  };
//date select create event
  const handleDateSelect = async (selectInfo) => {
    let title = prompt('Please enter a title for the event');
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect();
  
    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
  
      calendarApi.addEvent(newEvent);
  
      try {
        await axios.post('/api/events/create', newEvent);
        setCurrentEvents([...currentEvents, newEvent]); 
        showPopup('Event added successfully', 'success');
      } catch (error) {
        console.error('Failed to create event:', error);
        showPopup('Failed to add event', 'error');
      }
    }
  };
  

  const handleEventClick = (clickInfo) => {
    setEventToDelete(clickInfo.event);
    setShowDeleteConfirmation(true);
  };
//delete confirm
  const handleConfirmDelete = (clickInfo) => {
    if (eventToDelete) {
      const eventIdToDelete = eventToDelete.id;
  
      axios.delete(`/api/events/delete/${eventIdToDelete}`)
        .then(() => {
          setEventToDelete(null);
          setShowDeleteConfirmation(false);
          
          setCurrentEvents(currentEvents.filter(event => event.id !== eventToDelete.id));
          
          showPopup('Event deleted successfully', 'success');
        })
        .catch(error => {
          console.error('Failed to delete event:', error);
          showPopup('Failed to delete event', 'error');
        });
    }
  };
  

  const handleCancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {popupStatus && (
        <div className={`calenderpop popup ${popupStatus}`}>
          <div className='calenderpop'></div>
          <div className={`popup ${popupStatus} `}>
            {popupMessage}
          </div>
        </div>
      )}

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          events={currentEvents} // Use currentEvents for all calendar views
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
