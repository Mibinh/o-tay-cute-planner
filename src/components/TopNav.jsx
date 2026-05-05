import { Bell, Settings, Search } from 'lucide-react';
import React from 'react'

const TopNav = () => {
  const tabs = [
    { id: 'weeklyBoard', label: 'Mục tiêu của tuần', active: true },
    { id: 'monthlyGoals', label: "Mục tiêu của tháng", active: false }
  ];
  return (
    <nav className='flex justify-between items-center px-10 py-4 rounded-full border border-gray-100 bg-white/80 mb-8 shadow-md backdrop-blur sticky top-4 z-50'>
      {/* Tab */}
      {/* Nhóm 1: Bao gồm logo app và navigation tab */}
      <div className='flex justify-between items-start gap-6'>
        {/* Tên app */}
        <h1 className='text-xl font-bold text-[#5C3D4D] leading-none'>Scrapbooker</h1>
        {/* Navigation tab */}
        <div className='flex items-center gap-10'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`cursor-pointer relative text-sm transition-all tracking-tight pb-2 hover:scale-110 ${tab.active ? 'text-[#884A6C] font-bold' : 'text-gray-400 hover:text-gray-600 hover:font-bold'}`}
            >
              {tab.label}
              {tab.active && (
                <span className='absolute bottom-1 left-0 h-[2px] rounded-full bg-[#FFB1D8] w-full animate-in fade-in slide-in-from-bottom-1 duration-500'></span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Nhóm 2: Các nút chức năng */}
      {/* Thanh search */}
      <div className='flex items-center gap-6'>
      <div className='relative flex items-center hover:scale-120 transition-transform'>
        <Search className='w-4 h-4 text-gray-400 absolute left-4 pointer-events-none' />
        <input
          type="text"
          placeholder="Tìm kiếm công việc"
          className='pl-12 pr-6 py-2.5 bg-[#F9F6F0] rounded-full border-none outline-none text-xs font-medium focus:ring-pink-100 focus:ring-2'
        />
      </div>
      
      <div className='flex items-center gap-4'>
      {/* Icon thông báo*/}
      <div className='flex items-center gap-4 border-l border-gray-100 pl-6 hover:scale-120 transition-transform'>
        <button className='p-2 hover:bg-pink-100 rounded-full transition-colors'>
          <Bell className='w-5 h-5 text-gray-400 hover:text-pink-600 hover:scale-110 transition-transform' />
        </button> 
      </div>

      {/* Icon cài đặt */}
      <button className='p-2 hover:bg-pink-100 rounded-full hover:scale-120 transition-transform'>
        <Settings className='w-5 h-5 text-gray-400 hover:text-pink-600 hover:scale-110 transition-transform' />
      </button>
      {/* Icon tài khoản */}

      <button className='p-2 hover:bg-pink-100 rounded-full hover:scale-120 transition-transform'>
        <div className='w-10 h-10 rounded-full bg-pink-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:scale-110 transition-transform'>
          <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mibinh" alt="profile" />
        </div>
      </button>
      </div>
      </div>
    </nav>
  )
}

export default TopNav