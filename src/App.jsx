import { useState } from "react"

const getWeeklyDays = () => {
  const curr = new Date(); // Lấy ngày hiện tại
  const week =[]; // Tạo mảng lấy các ngày trong tuần

  // Tính toán để tìm ra ngày T2 của tuần này
  // curr.getDate() trả về số ngày trong tuần (1-7)
  // curr.getDay() trả về số ngày trong tuần (0-6)
  // curr.getDate() - curr.getDay() + 1 sẽ trả về số ngày từ T2 đến ngày hiện tại
  const first = curr.getDate() - 
  
  

}