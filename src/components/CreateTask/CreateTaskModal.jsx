// Là khung xương chính của create-task

import React, { useState } from 'react';
import {X} from "lucide-react"
import TaskForm from './TaskForm'
import TaskPreview from './TaskPreview'

const CreateTaskModal = ({isOpen, onClose}) => {
    // 1. Quản lý State chung cho cả Form và Preview
    const [taskData, setTaskData] = useState ({})

    // 2. Xử lý khi đóng Modal
    const handleClose = () =>{
        onClose()
        setTimeout(() => {
            setTaskData({})
        }, 300)  // Độ trễ để hiệu ứng đóng kịp
    }

    // 3. Render giao diện
    if(!isOpen) return null

    return(

    )
}

export default CreateTaskModal
