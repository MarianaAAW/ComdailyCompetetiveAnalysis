import React from 'react';
import AnalysisDetail from '../components/Analysis/AnalysisDetail';
import { Container } from '@mui/material';

const AnalysisDetailPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AnalysisDetail />
    </Container>
  );
};

export default AnalysisDetailPage;