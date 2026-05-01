import React from 'react';
import { MoreHorizontal, Heart, Star } from 'lucide-react';

const TaskCard = ({ title, category, priority }) => {
  const accentColors = {
    high: 'border-[#5C3D4D]',
    medium: 'border-[#B07A95]',
    low: 'border-[#D8A7B1]',
  };

  const barColors = {
    high: 'bg-[#5C3D4D]',
    medium: 'bg-[#B07A95]',
    low: 'bg-[#D8A7B1]',
  };

  return (
    <div className="group relative bg-white rounded-[24px] border border-gray-100/50 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 paper-dots h-full min-h-[160px] flex flex-col">
      {/* Thick Left Accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-3 ${accentColors[priority] || 'bg-[#B07A95]'}`}></div>
      
      <div className="pl-6 p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-black text-[#5C3D4D] leading-tight tracking-tight pr-4">
            {title}
          </h4>
          <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed font-medium">
          Reflect on the session and update the scrapbook with stickers.
        </p>

        <div className="mt-auto pt-4">
          {/* Progress Bar Container */}
          <div className="relative h-1.5 w-full bg-gray-50 rounded-full overflow-hidden mb-3">
             <div className={`absolute top-0 left-0 h-full w-2/3 rounded-full opacity-80 ${barColors[priority] || 'bg-pink-300'}`}></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
               <div className={`w-2 h-2 rounded-full ${barColors[priority] || 'bg-pink-400'}`}></div>
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{category}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-50" />
               <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
