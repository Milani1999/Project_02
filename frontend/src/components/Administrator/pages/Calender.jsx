import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import axios from 'axios';

import { createEventId } from '../data/index';
import useCalendar from '../store/Cal';

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

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupStatus, setPopupStatus] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('/api/events'); // Fetch events from backend
        setCurrentEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }

    fetchEvents();
  }, []);

  const showPopup = (message, status) => {
    setPopupMessage(message);
    setPopupStatus(status);
    setTimeout(() => {
      setPopupMessage('');
      setPopupStatus(null);
    }, 3000); // Popup disappears after 3 seconds
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a title for the event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      };

      calendarApi.addEvent(newEvent);

      try {
        axios.post('/api/events/create', newEvent); // Create event on backend
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

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      const eventIdToDelete = eventToDelete.id; // Assuming eventToDelete.id is the correct event ID
  
      try {
        await axios.delete(`/api/events/${eventIdToDelete}`); // Delete event on backend
        setEventToDelete(null);
        setShowDeleteConfirmation(false);
        setCurrentEvents(currentEvents.filter(event => event.id !== eventToDelete.id));
        showPopup('Event deleted successfully', 'success');
      } catch (error) {
        console.error('Failed to delete event:', error);
        showPopup('Failed to delete event', 'error');
      }
    }
  };

  const handleCancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteConfirmation(false);
  };
  return (
    <div className="calendar-container">
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Popup box */}
      {popupStatus && (
        <div className={`popup ${popupStatus}`}>
          {popupMessage}
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
          initialEvents={currentEvents}
        
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;