import { Bell, Settings, Search } from 'lucide-react';
import React from 'react'

const TopNav = () => {
  const tabs = [
    { id: 'weeklyboard', label: 'Mục tiêu của tuần', active: true },
    { id: 'History', label: "Mục lưu trữ", active: false }
  ];
  return (
    <nav className='flex justify-between items-center px-8 py-4 rounded-full border border-gray-100 bg-white/80 mb-8 shadow-md backdrop-blur sticky top-4 z-50 '>
      {/* Tab */}
      {/* Nhóm 1: Bao gồm logo app và navigation tab */}
      <div className='flex justify-between items-center'>
        {/* Tên app */}
        <h1 className='text-xl font-bold text-[#7D4F6D]'>Scrapbooker</h1>
        {/* Navigation tab */}
        <div className='flex items-center gap-10'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`cursor-pointer relative text-sm font-bold transition-all tracking-tight pb-1 ${tab.active ? 'text-[#5C3D4D]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab.label}
              {tab.active && (
                <span className='absolute bottom-1 left-0 h-[3px] rounded-full bg-[#D8A7B1] w-full animate-in fade-in slide-in-from-bottom-1 duration-500'></span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Nhóm 2: Các nút chức năng */}
      {/* Thanh search */}
      <div className='relative flex items-center'>
        <Search className='w-4 h-4 text-gray-400 absolute left-4 pointer-events-none' />
        <input
          type="text"
          placeholder="Tìm kiếm công việc"
          className='pl-12 pr-6 py-2.5 bg-[#F9F6F0] rounded-full border-none outline-none text-xs font-medium focus:ring-pink-300 focus:ring-2'
        />
      </div>

      {/* Icon thông báo*/}
      <div className='flex items-center gap-4 border-l border-gray-100 pl-6'>
        <button className='p-2 hover:bg-gray-50 rounded-full transition-colors'>
          <Bell className='w-4 h-4 text-gray-400' />
        </button>
      </div>

      {/* Icon cài đặt */}
      <button className='p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <Settings className='w-4 h-4 text-gray-400' />
      </button>
      {/* Icon tài khoản */}

      <button className='p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <div className='w-10 h-10 rounded-full bg-pink-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:scale-110 transition-transform'>
          <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mibinh" alt="profile" />
        </div>
      </button>
    </nav>
  )
}

export default TopNav