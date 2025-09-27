// src/components/ReadNoteModal.jsx

import React from 'react';

const ReadNoteModal = ({ open, onClose, note }) => {
  if (!open || !note) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-30" onClick={onClose}>
      <div 
        className="w-full max-w-2xl p-8 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/10 text-white"
        onClick={(e) => e.stopPropagation()} // Click ko modal ke andar rokne ke liye
      >
        <h2 className="text-3xl font-bold mb-4 break-words">{note.title}</h2>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <p className="text-gray-300 whitespace-pre-wrap break-words">{note.content}</p>
        </div>
        <div className="flex justify-end mt-6">
           <button 
             onClick={onClose} 
             className="px-6 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
           >
             Close
           </button>
        </div>
      </div>
    </div>
  );
};

export default ReadNoteModal;