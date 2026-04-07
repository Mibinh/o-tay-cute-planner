import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';

// --- HÀM CÔNG CỤ (Helper) ---
// Hàm này giúp tạo ra mảng 7 ngày trong tuần từ một ngày bất kỳ
const getWeeklyDays = (anchorDate = new Date()) => {
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 }); // 1 là Thứ 2
  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(start, index);
    return {
      id: format(date, 'yyyy-MM-dd'), // ID dùng để nối với dữ liệu sau này
      dayName: format(date, 'EEEE', { locale: vi }), // "Thứ Hai"
      dateNum: format(date, 'd'), // "7"
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    };
  });
};

function App() {
  // Lấy danh sách 7 ngày của tuần hiện tại
  const weekDays = getWeeklyDays();

  return (
    <div className="min-h-screen bg-[#F9F8F1] p-6 font-sans overflow-hidden">
      {/* Header của Weekly Board */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 italic tracking-tight">
          Weekly <span className="text-pink-500 underline decoration-wavy">Planner</span>
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
            Hôm nay
          </button>
        </div>
      </div>

      {/* Grid 7 Cột - Đây là linh hồn của Step 1 */}
      <div className="grid grid-cols-7 gap-3 h-[75vh]">
        {weekDays.map((day) => (
          <div 
            key={day.id} 
            className={`flex flex-col border-2 border-dashed rounded-[2.5rem] p-4 transition-all
              ${day.isToday 
                ? 'bg-pink-50 border-pink-300 shadow-inner' 
                : 'bg-white/40 border-gray-200 hover:border-gray-300'}`}
          >
            {/* Header của từng cột ngày */}
            <div className="text-center mb-6">
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
                {day.dayName}
              </p>
              <p className={`text-3xl font-black mt-1 ${day.isToday ? 'text-pink-500' : 'text-gray-700'}`}>
                {day.dateNum}
              </p>
            </div>

            {/* Vùng Droppable (Nơi sẽ chứa các Section Card ở Step 2) */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              {/* Sau này SectionCard sẽ nằm ở đây */}
              {day.isToday && (
                <div className="p-4 bg-yellow-100 rounded-2xl border-2 border-black/5 rotate-2 text-xs font-bold text-gray-600 shadow-sm">
                  ⭐ Chào mừng bạn đến với Weekly Board!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;