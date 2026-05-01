import React from 'react'

const TopNav = () => {
  const Tab = [
    { id:'nameapp', label:'Scrapbooker'},
    { id:'weeklyboard', label:'Mục tiêu của tuần', active: 'true'},
    { id: 'History', label:"Mục lưu trữ", active: 'flase'}
  ];
  return(
    <nav className='flex justify-between items-center px-8 py-4 rounded-full border border-gray-100 bg-white/80 mb-8 shadow-md backdrop-blur sticky top-4 z-50 '>
      {/* Tab */}
      {/* Nhóm 1: Bao gồm logo app và navigation tab */}
      <div className='flex justify-between items-center'>
        {/* Tên app */}
        <h1 className='text-xl font-bold text-[#7D4F6D]'>Scrapbooker</h1>
      {/* Navigation tab */}
      <div className ='flex items-center gap-10'>
        {Tab.map((tab, idx) =>{
          <button key={tab.id} className='cusor-pointer relative text-sm font-bold transition-all tracking-tight pb-1 text-[#7D4F6D]' > {tab.label} </button>
      
      </div>
      </div>
      

    </nav>
      
  )


}