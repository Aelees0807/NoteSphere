import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import NoteCard from '../components/NoteCard.jsx';
import EditNoteModal from '../components/EditNoteModal.jsx';
import ProfileDrawer from '../components/ProfileDrawer.jsx';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';
import ReadNoteModal from '../components/ReadNoteModal.jsx';

const initialNotes = [
  { id: 1, title: 'My First Note', content: 'This is the content of my first note.' },
  { id: 2, title: 'Hackathon Idea', content: 'Build a secure notes app with JWT.' },
  { id: 3, title: 'Shopping List', content: 'Milk, Bread, Eggs, and Coffee.' },
];

const NotesPage = ({ onLogout, user }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentNoteToEdit, setCurrentNoteToEdit] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [readModalOpen, setReadModalOpen] = useState(false);
  const [currentNoteToRead, setCurrentNoteToRead] = useState(null);
  // ...existing code...
  const handleOpenReadModal = (note) => {
    setCurrentNoteToRead(note);
    setReadModalOpen(true);
  };

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    setNotes([{ id: Date.now(), title: newNoteTitle, content: newNoteContent }, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleOpenDeleteDialog = (id) => {
    setNoteIdToDelete(id);
    setDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    const noteToDelete = notes.find(n => n.id === noteIdToDelete);
    if (noteToDelete) {
      setDeletedNotes([noteToDelete, ...deletedNotes]);
      setNotes(notes.filter(note => note.id !== noteIdToDelete));
    }
    setDialogOpen(false);
    setNoteIdToDelete(null);
  };

  const handlePermanentDelete = (id) => {
    setDeletedNotes(deletedNotes.filter(note => note.id !== id));
  };
  
  const handleOpenEditModal = (note) => {
    setCurrentNoteToEdit(note);
    setEditModalOpen(true);
  };

  const handleSaveNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };
  
  const handleRestoreNote = (id) => {
    const noteToRestore = deletedNotes.find(n => n.id === id);
    if(noteToRestore) {
      setNotes([noteToRestore, ...notes]);
      setDeletedNotes(deletedNotes.filter(note => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar 
        onLogout={onLogout} 
        onToggleDrawer={() => setDrawerOpen(true)}
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        notes={notes}
      />
      <ProfileDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        deletedNotes={deletedNotes}
        onRestore={handleRestoreNote}
        onPermanentDelete={handlePermanentDelete}
      />
      <main className="container mx-auto p-6">
        <div className="p-6 bg-black/20 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Create a New Note</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full px-4 py-2 text-white bg-white/10 border-2 border-transparent rounded-lg placeholder:text-gray-300 focus:outline-none focus:border-pink-500 transition"
            />
            <textarea
              placeholder="Content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full px-4 py-2 text-white bg-white/10 border-2 border-transparent rounded-lg placeholder:text-gray-300 focus:outline-none focus:border-pink-500 transition"
              rows="3"
            ></textarea>
            <button
              onClick={handleAddNote}
              className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Add Note
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">Your Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteDialog}
              onRead={handleOpenReadModal}
            />
          ))}
        </div>
      </main>
      
  <EditNoteModal open={editModalOpen} onClose={() => setEditModalOpen(false)} note={currentNoteToEdit} onSave={handleSaveNote} />
  <ConfirmationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={handleConfirmDelete} title="Delete Note?" message="This will move the note to the recycle bin." />
  <ReadNoteModal open={readModalOpen} onClose={() => setReadModalOpen(false)} note={currentNoteToRead} />
    </div>
  );
};

export default NotesPage;