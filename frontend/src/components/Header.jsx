import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Brand Analysis
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/new-analysis">
            New Analysis
          </Button>
          <Button color="inherit" component={RouterLink} to="/saved-analyses">
            Saved Analyses
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
