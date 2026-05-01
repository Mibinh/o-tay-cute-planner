import React from 'react';
import { Plus, Download } from 'lucide-react';
import TaskCard from './TaskCard';

const DayColumn = ({ day }) => {
  // Mock data for demo
  const tasks = [
    { title: 'Morning Prep', category: 'Health', priority: 'low' },
    { title: 'Journal Entry', category: 'Study', priority: 'medium' },
  ];

  const columnBgColors = {
    'Thứ Hai': 'bg-[#FFF7E1]', // Mon - soft yellow
    'Thứ Ba': 'bg-[#E3F2FD]',   // Tue - soft blue
    'Thứ Tư': 'bg-[#FFF0F3]',   // Wed - soft pink
    'Thứ Năm': 'bg-[#F1F8E9]',  // Thu - soft green
    'Thứ Sáu': 'bg-[#F3E5F5]',  // Fri - soft purple
    'Thứ Bảy': 'bg-[#FFF3E0]',  // Sat - soft orange
    'Chủ Nhật': 'bg-[#ECEFF1]', // Sun - soft gray
  };

  const dayAbbr = {
    'Thứ Hai': 'Mon',
    'Thứ Ba': 'Tue',
    'Thứ Tư': 'Wed',
    'Thứ Năm': 'Thu',
    'Thứ Sáu': 'Fri',
    'Thứ Bảy': 'Sat',
    'Chủ Nhật': 'Sun',
  };

  return (
    <div className={`shrink-0 w-80 flex flex-col ${columnBgColors[day.dayName] || 'bg-white'} rounded-[40px] p-6 border border-white`}>
      <div className="flex items-center gap-2 mb-8 px-2 font-black text-[#5C3D4D]">
        <span className="text-xl">{dayAbbr[day.dayName] || day.dayName}</span>
        <span className="text-gray-400 font-bold opacity-60">{day.dateNum}</span>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar scroll-smooth">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} {...task} />
        ))}
        
        <button className="w-full h-32 border-2 border-dashed border-[#D8A7B1]/30 rounded-[32px] flex flex-col items-center justify-center gap-2 text-[#D8A7B1]/50 hover:border-[#D8A7B1] hover:bg-white/50 hover:text-[#D8A7B1] transition-all group shadow-sm bg-white/20">
          <Download className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Drop Here</span>
        </button>
      </div>
    </div>
  );
};

export default DayColumn;
