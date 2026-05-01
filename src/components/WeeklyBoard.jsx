import React from 'react';
import DayColumn from './DayColumn';
import getWeeklyDays from '../utils/date.js';

const WeeklyBoard = ({ anchorDate }) => {
  const days = getWeeklyDays(anchorDate);

  return (
    <div className="flex-1 flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth">
      {days.map((day) => (
        <DayColumn key={day.id} day={day} />
      ))}
    </div>
  );
};

export default WeeklyBoard;
