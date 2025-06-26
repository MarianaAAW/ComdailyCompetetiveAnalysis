import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';

const NewsletterAnalysisPage = () => {
  const [newsletterText, setNewsletterText] = useState('');
  const [pdfName, setPdfName] = useState('');

  const handleTextChange = (e) => {
    setNewsletterText(e.target.value);
  };

  const handlePdfUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfName(e.target.files[0].name);
      // You can handle the file upload logic here
    }
  };

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
          Newsletter Analysis
        </Typography>
        <Paper sx={{ p: 4, mt: 4, borderRadius: '30px', bgcolor: '#fff', minWidth: 350, boxShadow: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 2 }}>
            Attach Newsletter <span style={{ color: '#C2185B' }}>or</span> Type It
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ bgcolor: '#D48CA6', color: '#fff', borderRadius: '20px', mb: 2, fontFamily: 'Pacifico, cursive', '&:hover': { bgcolor: '#C2185B' } }}
          >
            Upload PDF
            <input type="file" accept="application/pdf" hidden onChange={handlePdfUpload} />
          </Button>
          {pdfName && (
            <Typography variant="body2" sx={{ mb: 2, color: '#C2185B' }}>{pdfName}</Typography>
          )}
          <Typography sx={{ color: '#C2185B', mb: 1, fontWeight: 'bold' }}>OR</Typography>
          <TextField
            multiline
            minRows={6}
            placeholder="Type or paste newsletter text here..."
            value={newsletterText}
            onChange={handleTextChange}
            fullWidth
            sx={{ mb: 2, bgcolor: '#F8BBD0', borderRadius: '10px', fontFamily: 'Pacifico, cursive' }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: '#C2185B', color: '#fff', borderRadius: '20px', fontFamily: 'Pacifico, cursive', px: 5, fontSize: '1.1rem', mt: 2, '&:hover': { bgcolor: '#D48CA6' } }}
          >
            Analyze
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default NewsletterAnalysisPage;
