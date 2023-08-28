import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import './TCalendar.css';
const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('/api/events/get');
        setCurrentEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="calendar-container">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="timeGridWeek"
          dayMaxEvents={true}
          events={currentEvents}
        />
      </div>
    </div>
  );
};

export default Calendar;
