import { startOfWeek, addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';

const getWeeklyDays = (anchorDate = new Date()) => {
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 }); // Monday
  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(start, index);
    return {
      id: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEEE', { locale: vi }), // "Thứ Hai"
      dateNum: format(date, 'd'), // "7"
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    };
  });
};

export default getWeeklyDays;
