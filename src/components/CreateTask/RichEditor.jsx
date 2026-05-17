import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Heading1, Heading2, Heading3, Heading4,List, Heart, Star, Circle, Square, ChevronDown } from 'lucide-react';

const RichEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [activeShape, setActiveShape] = useState('heart');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<div><br></div>";
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyStyle = (command, arg = null) => {
    document.execCommand(command, false, arg);
    editorRef.current.focus();
  };

  // Kho chứa các SVG cho Checkbox (Không màu nền fill="none")
  const svgShapes = {
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    circle: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"><circle cx="12" cy="12" r="10"/></svg>`,
    square: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`
  };

  const shapeOptions = [
    { id: 'heart', label: 'Trái tim', icon: <Heart size={14} className="text-[#D8A7B1]" fill="#D8A7B1" /> },
    { id: 'star', label: 'Ngôi sao', icon: <Star size={14} className="text-[#D8A7B1]" fill="#D8A7B1" /> },
    { id: 'circle', label: 'Hình tròn', icon: <Circle size={14} className="text-[#D8A7B1]" fill="#D8A7B1" /> },
    { id: 'square', label: 'Hình vuông', icon: <Square size={14} className="text-[#D8A7B1]" fill="#D8A7B1" /> },
  ];

  // HÀM 1: Biến ĐỔI dòng hiện tại thành dạng Todo Shape được chọn (Giống Word)
  const applyShapeToList = (shapeId) => {
    setActiveShape(shapeId);
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let currentNode = range.startContainer;
    
    // Tìm thẻ block bao quanh dòng hiện tại (thường là div hoặc p)
    while (currentNode && currentNode !== editorRef.current && currentNode.parentNode !== editorRef.current) {
      currentNode = currentNode.parentNode;
    }

    if (currentNode === editorRef.current || !currentNode) {
      // Nếu đang ở dòng trống hoàn toàn, tạo một khối div mới
      const newDiv = document.createElement('div');
      newDiv.innerHTML = `<br>`;
      editorRef.current.appendChild(newDiv);
      currentNode = newDiv;
    }

    // Nếu dòng này đã có checkbox rồi, chỉ đổi ruột SVG bên trong
    const existingCheckbox = currentNode.querySelector('.todo-checkbox-container');
    if (existingCheckbox) {
      const span = existingCheckbox.querySelector('.shape-box');
      if (span) span.innerHTML = svgShapes[shapeId];
      handleInput();
      return;
    }

    // Nếu là dòng chữ bình thường, bọc nó lại thành cấu trúc Todo mới
    const textContent = currentNode.innerHTML === '<br>' ? '' : currentNode.innerHTML;
    currentNode.className = "todo-checkbox-container flex items-start gap-2 mb-2";
    currentNode.innerHTML = `
      <span contenteditable="false" class="shape-box cursor-pointer select-none flex items-center justify-center w-5 h-5 bg-[#D8A7B1] rounded-md mt-1 active:scale-95 transition-all">
        ${svgShapes[shapeId]}
      </span>
      <div class="todo-text flex-1 outline-none text-[#5C3D4D]" contenteditable="true">${textContent || '<br>'}</div>
    `;

    // Đặt con trỏ chuột vào cuối vùng nhập chữ mới tạo
    setTimeout(() => {
      const todoTextNode = currentNode.querySelector('.todo-text');
      const newRange = document.createRange();
      newRange.selectNodeContents(todoTextNode);
      newRange.collapse(false); // Đưa con trỏ xuống cuối chữ
      selection.removeAllRanges();
      selection.addRange(newRange);
      todoTextNode.focus();
    }, 10);

    handleInput();
  };

  // HÀM 2: Bắt phím Enter và Backspace để xử lý tự động (Logic cốt lõi của Word)
  const handleKeyDown = (e) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let currentBlock = range.startContainer;

    // Tìm xem con trỏ chuột có đang nằm trong một dòng Todo nào không
    while (currentBlock && currentBlock !== editorRef.current && !currentBlock.classList?.contains('todo-checkbox-container')) {
      currentBlock = currentBlock.parentNode;
    }

    // Nếu không nằm trong dòng Todo nào, để trình duyệt xử lý bình thường
    if (!currentBlock || currentBlock === editorRef.current) return;

    const todoTextNode = currentBlock.querySelector('.todo-text');

    // TRƯỜNG HỢP 1: USER NHẤN ENTER => ĐẺ TIẾP DÒNG TODO MỚI CÙNG SHAPE
    if (e.key === 'Enter') {
      e.preventDefault(); // Ngăn chặn trình duyệt tự xuống dòng bậy bạ

      const newBlock = document.createElement('div');
      newBlock.className = "todo-checkbox-container flex items-start gap-2 mb-2";
      newBlock.innerHTML = `
        <span contenteditable="false" class="shape-box cursor-pointer select-none flex items-center justify-center w-5 h-5 bg-[#D8A7B1] rounded-md mt-1 active:scale-95 transition-all">
          ${svgShapes[activeShape]}
        </span>
        <div class="todo-text flex-1 outline-none text-[#5C3D4D]" contenteditable="true"><br></div>
      `;

      // Chèn dòng mới vào ngay phía sau dòng hiện tại
      currentBlock.parentNode.insertBefore(newBlock, currentBlock.nextSibling);

      // Đưa con trỏ chuột xuống dòng mới tạo để gõ tiếp
      const nextTodoText = newBlock.querySelector('.todo-text');
      const newRange = document.createRange();
      newRange.setStart(nextTodoText, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      nextTodoText.focus();

      handleInput();
    }

    // TRƯỜNG HỢP 2: USER NHẤN BACKSPACE KHI HẾT CHỮ => XÓA SHAPE, VỀ TEXT THƯỜNG
    if (e.key === 'Backspace') {
      // Điều kiện: Con trỏ chuột phải nằm ở đầu dòng chữ (vị trí 0) hoặc dòng chữ trống rỗng
      const isAtStart = range.startOffset === 0;
      const isEmpty = todoTextNode.innerHTML === '<br>' || todoTextNode.innerText.trim() === '';

      if (isAtStart || isEmpty) {
        e.preventDefault(); // Ngăn xóa ký tự của dòng trên

        // Biến đổi dòng Todo này quay trở lại thành thẻ div văn bản thuần túy
        const plainText = isEmpty ? '' : todoTextNode.innerHTML;
        currentBlock.className = ""; // Gỡ bỏ các class flex/gap của Todo
        currentBlock.innerHTML = plainText || '<br>';

        // Đặt lại con trỏ chuột vào dòng chữ thường đó
        const newRange = document.createRange();
        newRange.setStart(currentBlock, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        currentBlock.focus();

        handleInput();
      }
    }
  };

  const renderCurrentIcon = () => {
    if (activeShape === 'heart') return <Heart size={16} fill="currentColor" />;
    if (activeShape === 'star') return <Star size={16} fill="currentColor" />;
    if (activeShape === 'circle') return <Circle size={16} fill="currentColor" />;
    return <Square size={16} fill="currentColor" />;
  };

  return (
    <div className="w-full border rounded-2xl bg-white border-slate-200 font-plus-jakarta">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between p-2 bg-slate-50 border-b border-slate-200 rounded-t-2xl">
        <div className="flex gap-1">
          <button onClick={() => applyStyle('bold')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Bold size={16} /></button>
          <button onClick={() => applyStyle('italic')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Italic size={16} /></button>
          <div className="w-[1px] bg-slate-200 mx-1 self-stretch" />
          <button onClick={() => applyStyle('formatBlock', 'h1')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Heading1 size={16} /></button>
          <button onClick={() => applyStyle('formatBlock', 'h2')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Heading2 size={16} /></button>
          <button onClick={() => applyStyle('formatBlock', 'h3')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Heading3 size={16} /></button>
          <button onClick={() => applyStyle('formatBlock', 'h4')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><Heading4 size={16} /></button>
          <div className="w-[1px] bg-slate-200 mx-1 self-stretch" />
          <button onClick={() => applyStyle('insertUnorderedList')} className="p-2 hover:bg-white rounded transition-all text-[#5C3D4D]"><List size={16} /></button>
        </div>

        {/* NÚT CHỌN SHAPE KÈM DROPDOWN */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[#5C3D4D] hover:bg-slate-100 transition-all text-xs font-bold"
          >
            {renderCurrentIcon()}
            <span className="ml-1">Todo Style</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
              {shapeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    applyShapeToList(option.id); // Chọn phát là ÉP dòng hiện tại biến đổi luôn!
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs font-medium transition-colors ${
                    activeShape === option.id ? 'bg-pink-50 text-[#B07A95] font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VÙNG SOẠN THẢO CHÍNH */}
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onKeyDown={handleKeyDown} // Đăng ký bộ lắng nghe phím gõ để bắt Enter / Backspace
        suppressContentEditableWarning={true}
        className="w-full min-h-[200px] p-4 outline-none prose prose-slate max-w-none text-[#5C3D4D]"
        placeholder="Viết ghi chú của bạn ở đây..."
      />
    </div>
  );
};

export default RichEditor;