import React from 'react';
import { 
  Box, 
  Typography, 
  Divider,
  Link
} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Brand Analysis Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        <Link color="inherit" href="#" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        |
        <Link color="inherit" href="#" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
        |
        <Link color="inherit" href="#" sx={{ mx: 1 }}>
          Contact Us
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;