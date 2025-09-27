import { Edit, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="p-6 space-y-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg h-full flex flex-col">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-charcoal-blue dark:text-white mb-2">{note.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <button onClick={onEdit} className="p-2 text-gray-500 dark:text-gray-300 hover:text-electric-blue transition-colors"><Edit size={18} /></button>
        <button onClick={onDelete} className="p-2 text-gray-500 dark:text-gray-300 hover:text-neon-magenta transition-colors"><Trash2 size={18} /></button>
      </div>
    </div>
  );
}