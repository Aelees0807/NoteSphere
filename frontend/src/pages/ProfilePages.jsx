// src/pages/ProfilePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// This would come from your App's state or a context provider
const user = {
  name: 'Tejas',
  email: 'tejas.user@example.com',
  joinDate: '2023-10-27',
};

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Button 
        onClick={() => navigate('/notes')} 
        startIcon={<ArrowBackIcon />}
        sx={{ position: 'absolute', top: 40, left: 40, color: 'white' }}
      >
        Back to Notes
      </Button>
      <Paper
        elevation={12}
        sx={{
          p: 6,
          backgroundColor: 'rgba(30, 30, 30, 0.7)',
          borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            m: '0 auto',
            mb: 3,
            bgcolor: 'secondary.main',
            fontSize: '3rem',
            border: '4px solid white'
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        <Typography component="h1" variant="h3" sx={{ mb: 1, letterSpacing: '1px' }}>
          {user.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {user.email}
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                    <strong>Joined on:</strong> {new Date(user.joinDate).toLocaleDateString()}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                    <strong>Total Notes:</strong> 15 {/* This is static data for now */}
                </Typography>
            </Grid>
        </Grid>
        
        <Button
          variant="contained"
          sx={{ 
              mt: 5, 
              py: 1.5, 
              px: 5,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)' 
          }}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;