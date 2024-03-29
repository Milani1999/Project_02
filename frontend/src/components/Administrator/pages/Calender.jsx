import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import './Calendar.css';

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('/api/events/get');
       
        const modifiedEvents = response.data.map(event => ({
          ...event,
          start: event.start.split('T')[0], 
          end: event.end.split('T')[0],    
        }));
        setCurrentEvents(modifiedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }

    fetchEvents();
  }, []);

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, 3000);
  };

  const handleDateSelect = async (selectInfo) => {
    const title = prompt('Please enter a title for the event');

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      try {
        const response = await axios.post('/api/events/create', newEvent);
        const createdEvent = response.data;
        setCurrentEvents([...currentEvents, createdEvent]);
        showPopup('Event added successfully');
      } catch (error) {
        console.error('Failed to create event:', error);
        showPopup('Failed to add event');
      }
    }
  };

  const handleEventClick = (clickInfo) => {
    setEventToDelete(clickInfo.event);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        const eventId = eventToDelete.id;
        await axios.delete(`/api/events/delete/${eventId}`);
        setCurrentEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        setEventToDelete(null);
        setShowDeleteConfirmation(false);
        showPopup('Event deleted successfully');
      } catch (error) {
        console.error('Failed to delete event:', error);
        showPopup('Failed to delete event');
      }
    }
  };

  const handleCancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="calendar-container">
      <div className='cal'></div>
      {popupMessage && <div className="popup">{popupMessage}</div>}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Do you want to delete this event?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
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
          initialView="timeGridWeek"
          selectable={true}
          dayMaxEvents={true}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
