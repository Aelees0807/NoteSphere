import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const getToken = () => localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const token = getToken();
      if (!token) return;
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: searchTerm }
      };
      const response = await axios.get(`${API_URL}/notes`, config);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      // If fetching fails, it's often an auth issue, so alert the user.
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log out and log back in.");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [searchTerm]);

  const handleSaveNote = async (noteData) => {
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (noteData.id) {
        await axios.put(`${API_URL}/notes/${noteData.id}`, { title: noteData.title, content: noteData.content }, config);
      } else {
        await axios.post(`${API_URL}/notes`, { title: noteData.title, content: noteData.content }, config);
      }
      closeModalAndRefresh();
    } catch (error) {
      console.error('Failed to save note:', error);
      // --- START OF FIX ---
      // This alert will make the error visible to you instead of silent.
      alert(`Failed to save note. Please try again. Error: ${error.response ? error.response.data.message : error.message}`);
      // --- END OF FIX ---
    }
  };
  
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/notes/${id}`, config);
      fetchNotes();
    } catch (error) {
        console.error('Failed to delete note:', error);
        alert(`Failed to delete note. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  const openModalToEdit = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };
  
  const openModalToCreate = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const closeModalAndRefresh = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
    fetchNotes();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input 
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 text-gray-900 dark:text-white bg-black/10 dark:bg-black/20 border-gray-400/50 dark:border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue"
          />
          <button 
            onClick={openModalToCreate}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 font-bold text-white bg-electric-blue rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={() => openModalToEdit(note)} 
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
        {notes.length === 0 && (
            <div className="text-center col-span-full py-16">
                <p className="text-gray-500 dark:text-gray-400">No notes found. Click "Add Note" to get started!</p>
            </div>
        )}
      </div>
      {isModalOpen && (
        <NoteModal
          note={currentNote}
          onSave={handleSaveNote}
          onClose={closeModalAndRefresh}
        />
      )}
    </>
  );
}