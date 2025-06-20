import React, { useState } from 'react';
import { createNewsletter } from '../../services/newsletterService';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper
} from '@mui/material';

const NewsletterForm = ({ brandId, onNewsletterCreated }) => {
  const [formData, setFormData] = useState({
    content_type: 'text',
    content: '',
    brand_id: brandId
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const newNewsletter = await createNewsletter(formData);
      onNewsletterCreated(newNewsletter);
      setFormData({ ...formData, content: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create newsletter');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Newsletter
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Content Type</InputLabel>
          <Select
            value={formData.content_type}
            label="Content Type"
            onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="doc">DOC/DOCX</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          multiline
          rows={6}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
            size="large"
          >
            {isSubmitting ? 'Submitting...' : 'Save Newsletter'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewsletterForm;