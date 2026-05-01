import React, { useState } from 'react';
import SideBar from './components/SideBar';
import TopNav from './components/TopNav';
import WeeklyBoard from './components/WeeklyBoard';
import { ChevronLeft, ChevronRight, Plus, Leaf, BookOpen, Coffee, Sparkles } from 'lucide-react';
import { startOfWeek, endOfWeek, format, addDays } from 'date-fns';

function App() {
  const [anchorDate, setAnchorDate] = useState(new Date());
  
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
  const end = endOfWeek(anchorDate, { weekStartsOn: 1 });
  const dateRange = `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;

  const handlePrevWeek = () => setAnchorDate(prev => addDays(prev, -7));
  const handleNextWeek = () => setAnchorDate(prev => addDays(prev, 7));

  return (
    <div className="min-h-screen bg-white flex p-6 gap-8 font-plus-jakarta relative overflow-hidden text-[#5C3D4D]">
      {/* Sidebar Section */}
      <SideBar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <TopNav />
        
        <div className="flex-1 flex flex-col px-4">
          {/* Header Section */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Weekly Board</h1>
              <div className="flex items-center gap-3 text-gray-400 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#D8A7B1]" />
                <span>{dateRange}</span>
                <span className="opacity-30">|</span>
                <span className="italic font-medium text-[#B07A95]">You're doing great!</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handlePrevWeek}
                className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center text-gray-400 hover:text-[#5C3D4D] hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextWeek}
                className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center text-gray-400 hover:text-[#5C3D4D] hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </header>

          {/* Board Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <WeeklyBoard anchorDate={anchorDate} />
          </div>
        </div>
      </main>

      {/* Floating Action Elements (Bottom Right) */}
      <div className="fixed bottom-12 right-12 flex flex-col items-end gap-6">
        {/* Category Island */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-[32px] shadow-2xl border border-gray-100 flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-700">
           <button className="w-12 h-12 rounded-full bg-[#F1F8E9] flex items-center justify-center text-green-600 hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
           </button>
           <button className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
           </button>
           <button className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center text-orange-600 hover:scale-110 transition-transform">
              <Coffee className="w-6 h-6" />
           </button>
        </div>

        {/* Global Add Button */}
        <button className="group w-16 h-16 bg-linear-to-br from-[#B07A95] to-[#D8A7B1] rounded-full flex items-center justify-center text-white shadow-2xl shadow-pink-200 hover:scale-110 transition-all duration-300">
           <Plus className="w-8 h-8 group-rotate-90 transition-transform duration-500" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-300 pointer-events-none uppercase tracking-[0.3em]">
        Hand-crafted with love & stickers © 2024
      </div>
    </div>
  );
}

export default App;