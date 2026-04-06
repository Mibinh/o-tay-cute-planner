import { useState } from 'react'

function App() {
  // Dữ liệu mẫu cho 7 ngày trong tuần
  const [days] = useState([
    { id: 1, label: "Thứ Hai", date: "30", icon: "🌸", color: "bg-pink-50" },
    { id: 2, label: "Thứ Ba", date: "31", icon: "🌈", color: "bg-blue-50" },
    { id: 3, label: "Thứ Tư", date: "01", icon: "⭐", color: "bg-yellow-50" },
    { id: 4, label: "Thứ Năm", date: "02", icon: "🦋", color: "bg-purple-50" },
    { id: 5, label: "Thứ Sáu", date: "03", icon: "🌻", color: "bg-green-50" },
    { id: 6, label: "Thứ Bảy", date: "04", icon: "🎀", color: "bg-orange-50" },
    { id: 7, label: "Chủ Nhật", date: "05", icon: "☀️", color: "bg-red-50" },
  ]);

  return (
    <div className="flex h-screen w-full bg-[#FFF5F5] font-sans">
      
      {/* SIDEBAR TRÁI - Màu hồng nhạt */}
      <aside className="w-72 bg-[#FCE7F3] p-6 flex flex-col gap-6 border-r border-pink-200">
        <div className="bg-white p-5 rounded-3xl shadow-sm text-center">
          <h1 className="text-xl font-bold text-gray-800">Sổ Tay Cute 📝</h1>
          <p className="text-xs text-pink-400 mt-1">Lập kế hoạch thật vui ✨</p>
        </div>
        
        <div className="flex-1 bg-white/40 rounded-3xl p-4 border border-white/50">
          <p className="text-center text-sm text-pink-500 font-medium">Tháng 04 / 2026</p>
          {/* Sau này ta sẽ thêm lịch nhỏ ở đây */}
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH - Weekly View */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">Lịch tuần của bạn 📅</h2>
            <p className="text-gray-500 text-sm">Chào buổi sáng! Hôm nay bạn cần làm gì? ✨</p>
          </div>
          <button className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-pink-500 hover:scale-105 transition-transform">
            Tuần tới ➡️
          </button>
        </header>

        {/* Lưới 7 ngày (Layout Grid) */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => (
            <div 
              key={day.id} 
              className={`min-h-[350px] rounded-[2rem] p-4 shadow-sm border-2 border-transparent hover:border-pink-200 hover:shadow-md transition-all cursor-pointer ${day.color} bg-white`}
            >
              <div className="text-center border-b border-gray-100 pb-3 mb-4">
                <span className="text-3xl mb-2 block">{day.icon}</span>
                <p className="text-[10px] font-black text-gray-400 uppercase leading-none">{day.label}</p>
                <p className="text-3xl font-black text-gray-700 mt-1">{day.date}</p>
              </div>
              
              {/* Danh sách Task nhỏ bên trong ngày */}
              <div className="space-y-2">
                <p className="text-[10px] text-gray-400 italic text-center">Trống...</p>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  )
}

export default App