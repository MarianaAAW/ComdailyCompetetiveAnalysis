import React, { useState } from 'react';
import { createAnalysis } from '../../services/analysisService';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

const AnalysisForm = ({ brandId, onAnalysisCreated }) => {
  const [formData, setFormData] = useState({
    brand_id: brandId,
    result_json: {
      attributes: [
        { name: 'Brand Awareness', value: 3 },
        { name: 'Customer Loyalty', value: 3 },
        { name: 'Market Share', value: 3 }
      ]
    },
    summary: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...formData.result_json.attributes];
    newAttributes[index][field] = field === 'value' ? parseInt(value) : value;
    
    setFormData({
      ...formData,
      result_json: {
        ...formData.result_json,
        attributes: newAttributes
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate summary automatically
      const summary = `Brand Awareness: ${formData.result_json.attributes[0].value}/5, ` +
                     `Customer Loyalty: ${formData.result_json.attributes[1].value}/5, ` +
                     `Market Share: ${formData.result_json.attributes[2].value}/5`;

      const completeData = {
        ...formData,
        summary
      };

      const newAnalysis = await createAnalysis(completeData);
      onAnalysisCreated(newAnalysis);
      
      // Reset form
      setFormData({
        brand_id: brandId,
        result_json: {
          attributes: [
            { name: 'Brand Awareness', value: 3 },
            { name: 'Customer Loyalty', value: 3 },
            { name: 'Market Share', value: 3 }
          ]
        },
        summary: ''
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create analysis');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        New Brand Analysis
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {formData.result_json.attributes.map((attr, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Attribute Name"
            value={attr.name}
            onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Score</InputLabel>
            <Select
              value={attr.value}
              label="Score"
              onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Analysis'}
        </Button>
      </Box>
    </Box>
  );
};

export default AnalysisForm;