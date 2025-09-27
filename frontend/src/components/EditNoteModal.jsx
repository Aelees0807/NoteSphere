import React, { useState, useEffect } from 'react';

const EditNoteModal = ({ open, onClose, note, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
    onClose();
  };
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-30">
      <div className="w-full max-w-lg p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-white bg-white/10 rounded-lg focus:outline-none focus:border-pink-500 border-2 border-transparent transition"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-white bg-white/10 rounded-lg focus:outline-none focus:border-pink-500 border-2 border-transparent transition"
          rows="6"
        ></textarea>
        <div className="flex justify-end space-x-3">
           <button onClick={onClose} className="px-5 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">Cancel</button>
           <button onClick={handleSave} className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;