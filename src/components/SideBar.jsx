import React from 'react';
import { ClipboardList, Archive, Home, Plus, HelpCircle, LogOut, Sparkle } from 'lucide-react';
 
const SideBar =() => {
  const menuItems = [
    {icon: Home, label: 'Tổng quan', active: true },
    {icon: ClipboardList, label: 'To-do list', active: false },
    {icon: Archive, label: 'Kho lưu trữ', active: false },
  ];
  
 return (
  <aside className = 'w-64 h-[calc(100vh-48px)] flex flex-col bg-white rounded-[40px] border border-gray-100 p-8' shadow-sm>
    {/* Account user */}
    <div className ='flex items-center gap-3 mb-12 px-2 '>
      {/* Avatar user */}
      <div className='w-12 h-12 rounded-full bg-pink-50 border border-gray-300 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:scale-110 transition-transform'>
        <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mibinh" alt="profile" className='w-full h-full object-cover'/>
      </div>

      {/* Name user */}
      <div className='flex flex-col'>
        <span className='block font-black text-[#5C3D4D] text-lg leading-none mb-1'>Mĩ Bình</span>
        <span className='font-bold text-gray-400 text-[10px] tracking-wider italic'>Hôm nay làm gì?</span>
      </div>  
    </div>

    {/* Menu action */}
    <nav className='flex-1 space-y-2'>
      { menuItems.map((item,idx) => (
        // Status active
        <button
          key = {idx}
          className={`w-full flex items-center gap-4 px-5 py-4 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${item.active? 'bg-linear-to-r from-[#B07A95] to-[#D8A7B1] text-white font-bold shadow-lg shadow-pink-200/50' : 'text-gray-500 hover:bg-gray-50 hover:translate-x-3'}`}
        >
          {/* Icon */}
          <item.icon className={`w-5 h-5 ${item.active? 'text-white' : 'text-gray-500'}`}/>

          {/* Label */}
          <span className={`font-medium transition-colors ${item.active? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
        </button>

      ))}
    </nav>

    <div className='flex justify-center'>
    {/* Add task */}
    <button className='w-full bg-linear-to-r from-[#B07A95] to-[#D8A7B1] text-white py-4 rounded-full flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-100 hover:scale-105 transition-transform active:scale-95'>
      <Plus className='w-5 h-5 text-white'></Plus>
      <span className='text-sm'>Thêm mới</span>
    </button>
    </div>

    <div className='space-y-3 px-4 border-t border-gray-50 pt-6'>
      {/* Support */}
      <button className='flex items-center gap-3 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium hover:scale-120'>
        <HelpCircle className='w-5 h-5 '></HelpCircle>
        <span className='font-medium'>Hỗ trợ</span> 
      </button>
      {/* Đăng xuất */}
      <button className='flex items-center gap-3 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium hover:scale-120'>
        <LogOut className='w-5 h-5'></LogOut>
        <span className='font-medium'>Đăng xuất</span>
      </button>      
    </div>

  </aside>
 )
}
export default SideBar;