import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialBrand = { name: '', newsletterText: '', pdfName: '' };

const CompareBrandsPage = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([
    { ...initialBrand, created: false },
    { ...initialBrand, created: false }
  ]);

  const handleNameChange = (idx, e) => {
    const updated = [...brands];
    updated[idx].name = e.target.value;
    setBrands(updated);
  };

  const handleTextChange = (idx, e) => {
    const updated = [...brands];
    updated[idx].newsletterText = e.target.value;
    setBrands(updated);
  };

  const handlePdfUpload = (idx, e) => {
    if (e.target.files && e.target.files[0]) {
      const updated = [...brands];
      updated[idx].pdfName = e.target.files[0].name;
      setBrands(updated);
      // Handle file upload logic here if needed
    }
  };

  const handleCreate = (idx) => {
    const updated = [...brands];
    if (updated[idx].name.trim() !== '') {
      updated[idx].created = true;
      setBrands(updated);
      // Save brand name to localStorage for analysis page
      localStorage.setItem(`brand${idx+1}Name`, updated[idx].name);
    }
  };

  const handleCompare = () => {
    navigate('/analysis-result');
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#F8BBD0' }}>
      <Typography
        variant="h3"
        sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', textAlign: 'center', mt: 2 }}
      >
        Compare Brands
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', textAlign: 'center', mb: 4 }}
      >
        Max 2
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 8, mb: 4 }}>
        {brands.map((brand, idx) => (
          <Box key={idx}>
            <Paper sx={{ p: 2, bgcolor: '#E57399', borderRadius: '6px', mb: 2, minWidth: 250, textAlign: 'center' }}>
              {brand.created ? (
                <Typography sx={{ fontFamily: 'Pacifico, cursive', color: '#fff', fontWeight: 'bold', fontSize: '1.3rem' }}>
                  {brand.name}
                </Typography>
              ) : (
                <>
                  <Typography sx={{ fontFamily: 'Pacifico, cursive', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    Enter Brand name
                  </Typography>
                  <TextField
                    value={brand.name}
                    onChange={e => handleNameChange(idx, e)}
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1, bgcolor: '#fff', borderRadius: '4px', width: '90%' }}
                    placeholder="Brand Name"
                  />
                </>
              )}
            </Paper>
            {!brand.created && (
              <Button
                variant="contained"
                sx={{ bgcolor: '#C5A3C5', color: '#fff', borderRadius: '20px', mb: 2, fontFamily: 'Pacifico, cursive', boxShadow: 2, px: 3, fontSize: '1rem', '&:hover': { bgcolor: '#C2185B' } }}
                onClick={() => handleCreate(idx)}
              >
                CREATE
              </Button>
            )}
            <Paper sx={{ p: 2, mt: 2, borderRadius: '6px', bgcolor: '#fff', minHeight: 180, minWidth: 220, textAlign: 'center' }}>
              <Typography sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}>
                ATTACH NEWS LETTER<br />OR<br />TYPE IT
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{ bgcolor: '#D48CA6', color: '#fff', borderRadius: '20px', mb: 1, fontFamily: 'Pacifico, cursive', fontSize: '0.9rem', '&:hover': { bgcolor: '#C2185B' } }}
              >
                Upload PDF
                <input type="file" accept="application/pdf" hidden onChange={e => handlePdfUpload(idx, e)} />
              </Button>
              {brand.pdfName && (
                <Typography variant="body2" sx={{ color: '#C2185B', mb: 1 }}>{brand.pdfName}</Typography>
              )}
              <TextField
                multiline
                minRows={4}
                placeholder="Type or paste newsletter text here..."
                value={brand.newsletterText}
                onChange={e => handleTextChange(idx, e)}
                fullWidth
                sx={{ mt: 1, bgcolor: '#F8BBD0', borderRadius: '10px', fontFamily: 'Pacifico, cursive' }}
              />
            </Paper>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ bgcolor: '#C5A3C5', color: '#fff', borderRadius: '20px', fontFamily: 'Pacifico, cursive', px: 6, fontSize: '1.2rem', boxShadow: 2, '&:hover': { bgcolor: '#C2185B' } }}
          onClick={handleCompare}
        >
          COMPARE
        </Button>
      </Box>
    </Box>
  );
};

export default CompareBrandsPage;
