// src/components/ProfileDrawer.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Collapse } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Import a new icon
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ProfileDrawer = ({ open, onClose, user, deletedNotes, onRestore, onPermanentDelete }) => {
  const [isBinOpen, setIsBinOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigateToProfile = () => {
    navigate('/profile');
    onClose(); // Close the drawer after navigating
  };

  return (
    <Drawer 
      anchor="left" 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'rgba(18, 18, 18, 0.85)',
          backdropFilter: 'blur(10px)',
          width: 300
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>{user.name.charAt(0)}</Avatar>
        <Typography variant="h6">{user.name}</Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {/* Add the new list item for the profile */}
        <ListItemButton onClick={handleNavigateToProfile}>
          <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <ListItemButton onClick={() => setIsBinOpen(!isBinOpen)}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText primary="Recycle Bin" />
          {isBinOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isBinOpen} timeout="auto" unmountOnExit>
          {/* ... (rest of your component) */}
        </Collapse>
      </List>
    </Drawer>
  );
};

export default ProfileDrawer;