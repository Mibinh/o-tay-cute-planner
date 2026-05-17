import React from 'react';
import RichEditor from './RichEditor'; //Nhúng component RichEditor vào đây

const TaskForm = ({ taskData, setTaskData }) => {
  
  // Hàm cập nhật nhanh dữ liệu cho từng trường
  const updateField = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Mảng danh sách các kiểu giấy Scrapbook để hiển thị thành nút bấm chọn
  const paperStyles = [
    { id: 'lined', label: 'Giấy Kẻ Ngang' },
    { id: 'grid', label: 'Giấy Ô Vuông' },
    { id: 'dots', label: 'Giấy Chấm Bi' },
    { id: 'kraft', label: 'Giấy Kraft Cổ Điển' }
  ];

  // Mảng mã màu nhấn (Accent Color) dễ thương để nhuộm màu giấy note
  const accentColors = [
    '#FFFFFF', // Trắng nguyên bản
    '#FFF0F5', // Hồng Lavender
    '#E0F2FE', // Xanh Bầu Trời
    '#FEF3C7', // Vàng Kem Pastel
    '#F0FDF4'  // Xanh Bạc Hà
  ];

  return (
    <div className="w-full flex flex-col gap-6 font-plus-jakarta pr-2">
      
      {/* 1. Ô NHẬP TIÊU ĐỀ TASK */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-[#5C3D4D] uppercase tracking-wider">Tiêu đề nhiệm vụ</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#D8A7B1] text-sm font-medium text-[#5C3D4D] transition-colors"
          placeholder="Ví dụ: Lên kế hoạch tuần mới..."
          value={taskData.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>

      {/* 2. Ô NHẬP PHÂN NHÓM (CATEGORY) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-[#5C3D4D] uppercase tracking-wider">Nhóm / Danh mục</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#D8A7B1] text-sm font-medium text-[#5C3D4D] transition-colors"
          placeholder="Ví dụ: CÁ NHÂN, HỌC TẬP..."
          value={taskData.group || ''}
          onChange={(e) => updateField('group', e.target.value)}
        />
      </div>

      {/* 3. BỘ CHỌN KIỂU GIẤY (PAPER STYLE) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-[#5C3D4D] uppercase tracking-wider">Kiểu dáng giấy nền</label>
        <div className="grid grid-cols-2 gap-2">
          {paperStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => updateField('paperStyle', style.id)}
              className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all text-center ${
                taskData.paperStyle === style.id
                  ? 'bg-[#5C3D4D] text-white border-[#5C3D4D] shadow-md scale-[1.02]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. BỘ CHỌN MÀU GIẤY (Chỉ hiện khi không chọn giấy Kraft) */}
      {taskData.paperStyle !== 'kraft' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-black text-[#5C3D4D] uppercase tracking-wider">Màu sắc giấy nền</label>
          <div className="flex gap-3 items-center">
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateField('accentColor', color)}
                className={`w-8 h-8 rounded-full border transition-all relative ${
                  taskData.accentColor === color 
                    ? 'ring-2 ring-[#5C3D4D] ring-offset-2 scale-110' 
                    : 'border-slate-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. NHÚNG TRÌNH SOẠN THẢO RICH TEXT ĐÃ LÀM */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-[#5C3D4D] uppercase tracking-wider">Nội dung chi tiết</label>
        <RichEditor 
          value={taskData.content} 
          onChange={(htmlContent) => updateField('content', htmlContent)} 
        />
      </div>

    </div>
  );
};

export default TaskForm;