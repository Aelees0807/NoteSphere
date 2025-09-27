import { useState, useEffect } from 'react';

export default function NoteModal({ note, onSave, onClose }) {
  // If a 'note' prop exists, use its title, otherwise start with an empty string.
  // This is the main fix.
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  // This handleSubmit function is now robust.
  const handleSubmit = (e) => {
    e.preventDefault();
    // A trim check prevents saving notes that only contain whitespace.
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    onSave({ id: note?.id, title, content });
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="w-full max-w-lg p-8 space-y-6 rounded-2xl bg-charcoal-blue border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-white">{note ? 'Edit Note' : 'Create a New Note'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Note Title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full px-4 py-2 text-white bg-black/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required 
            />
          </div>
          <div className="mb-6">
            <textarea 
              placeholder="Note Content"
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full h-40 px-4 py-2 text-white bg-black/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue"
              // Content is not strictly required, but the field will be there.
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-5 py-2 text-white bg-white/10 rounded-md hover:bg-white/20 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-electric-blue rounded-md hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}