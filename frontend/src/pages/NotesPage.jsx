import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Grid } from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import NoteCard from '../components/NoteCard.jsx';

import ProfileDrawer from '../components/ProfileDrawer.jsx';


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

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
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
    setDeletedNotes([noteToDelete, ...deletedNotes]);
    setNotes(notes.filter(note => note.id !== noteIdToDelete));
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
    setEditModalOpen(false);
  };

  const handleRestoreNote = (id) => {
    const noteToRestore = deletedNotes.find(n => n.id === id);
    setNotes([noteToRestore, ...notes]);
    setDeletedNotes(deletedNotes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Navbar 
        onLogout={onLogout} 
        onToggleDrawer={() => setDrawerOpen(true)}
        notes={notes}
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      <ProfileDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        deletedNotes={deletedNotes}
        onRestore={handleRestoreNote}
        onPermanentDelete={handlePermanentDelete}
      />
      <Container sx={{ mt: 4 }}>
        <Box sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Create a New Note</Typography>
          <TextField label="Title" fullWidth value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} sx={{ mb: 2 }}/>
          <TextField label="Content" fullWidth multiline rows={4} value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} sx={{ mb: 2 }}/>
          <Button variant="contained" onClick={handleAddNote}>Add Note</Button>
        </Box>

        <Typography variant="h4" sx={{ mb: 3 }}>Your Notes</Typography>
        <Grid container spacing={3}>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <NoteCard note={note} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteDialog} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}><Typography>No notes found.</Typography></Grid>
          )}
        </Grid>
      </Container>
      
      <EditNoteModal open={editModalOpen} onClose={() => setEditModalOpen(false)} note={currentNoteToEdit} onSave={handleSaveNote} />
      <ConfirmationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={handleConfirmDelete} title="Delete Note?" message="This will move the note to the recycle bin." />
    </Box>
  );
};

export default NotesPage;