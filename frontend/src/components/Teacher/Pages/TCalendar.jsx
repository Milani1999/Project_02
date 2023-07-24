import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './TCalendar.css';
import useCalendar from '../../Administrator/store/Cal';



const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar();
 

  const handleEvents = async (events) => {
    await Promise.resolve(setCurrentEvents(events));
  };





  return (
    <div className="calendar-container">
      
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
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
};

export default Calendar;
