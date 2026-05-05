import React from 'react';
import { Home, Calendar, ClipboardList, Star, Trash2, Heart, Plus, HelpCircle, LogOut } from 'lucide-react';

const SideBar = () => {
  const menuItems = [
    { icon: Home, label: 'Overview', active: false },
    { icon: ClipboardList, label: 'Weekly Plans', active: true },
    { icon: Calendar, label: 'Daily Tasks', active: false },
    { icon: Star, label: 'Sticker Tray', active: false },
    { icon: Trash2, label: 'Archive', active: false },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-48px)] flex flex-col bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden truncate">
           <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" alt="logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="block text-lg font-black text-[#5C3D4D] leading-none mb-1">My Desk</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">STAY CREATIVE</span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-full transition-all duration-300 ${
              item.active 
                ? 'bg-linear-to-r from-[#B07A95] to-[#D8A7B1] text-white font-bold shadow-lg shadow-pink-200/50 scale-105' 
                : 'text-gray-500 hover:bg-gray-50 hover:translate-x-1'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-400'}`} />
            <span className="text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto space-y-6">
        <button className="w-full bg-linear-to-r from-[#B07A95] to-[#D8A7B1] text-white py-4 rounded-full flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-100 hover:scale-105 transition-transform active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="text-sm">Add New Task</span>
        </button>

        <div className="space-y-3 px-4 border-t border-gray-50 pt-6">
          <button className="flex items-center gap-3 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;