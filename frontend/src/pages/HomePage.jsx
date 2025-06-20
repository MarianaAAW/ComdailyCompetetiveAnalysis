import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Brand Analysis
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
        <Paper component={Link} to="/brands" sx={{ p: 3, textDecoration: 'none' }}>
          <Typography variant="h6">Brand Management</Typography>
        </Paper>
        <Paper component={Link} to="/newsletters" sx={{ p: 3, textDecoration: 'none' }}>
          <Typography variant="h6">Newsletters</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;