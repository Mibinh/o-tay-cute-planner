import { create } from 'zustand';

export const useTodoStore = create((set) => ({
  // Lưu trữ tất cả các mẩu giấy note
  taskGroups: [], 

  // Hàm để thêm một mẩu giấy mới vào một ngày cụ thể
  addTaskGroup: (dayId, newGroup) => set((state) => ({
    taskGroups: [
      ...state.taskGroups, 
      { 
        ...newGroup, 
        id: Date.now().toString(), // Tạo ID duy nhất cho card
        dateId: dayId // Gắn card vào ID của ngày (ví dụ: "2026-04-06")
      }
    ]
  })),

  // Hàm xóa mẩu giấy
  deleteGroup: (id) => set((state) => ({
    taskGroups: state.taskGroups.filter(g => g.id !== id)
  })),
}));