import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AnalysisList from '../components/Analysis/AnalysisList';
import AnalysisForm from '../components/Analysis/AnalysisForm';
import { Container, Typography, Box } from '@mui/material';

const AnalysisPage = () => {
  const { brandId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAnalysisCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Brand Analysis
        </Typography>
        
        {brandId ? (
          <>
            <AnalysisForm 
              brandId={brandId} 
              onAnalysisCreated={handleAnalysisCreated} 
            />
            <AnalysisList 
              key={refreshKey} 
              brandId={brandId} 
            />
          </>
        ) : (
          <Typography>Select a brand to view analysis</Typography>
        )}
      </Box>
    </Container>
  );
};

export default AnalysisPage;