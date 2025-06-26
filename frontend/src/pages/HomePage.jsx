import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import '@fontsource/pacifico';

const HomePage = () => {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#F8BBD0' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
      }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', textAlign: 'center' }}
        >
          Welcome to Brand Analysis
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', textAlign: 'center', mb: 4 }}
        >
          by Comdaily
        </Typography>
        <Box>
          <Paper
            component={Link}
            to="/compare-brands"
            sx={{
              p: 3,
              px: 8,
              borderRadius: '40px',
              bgcolor: '#D48CA6',
              color: '#fff',
              fontFamily: 'Pacifico, cursive',
              fontSize: '1.5rem',
              textAlign: 'center',
              boxShadow: 3,
              textDecoration: 'none',
              transition: 'background 0.3s',
              '&:hover': { bgcolor: '#C2185B' },
            }}
            elevation={4}
          >
            Start Brand Analysis
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;