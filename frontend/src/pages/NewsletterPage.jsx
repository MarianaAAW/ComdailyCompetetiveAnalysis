import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Tabs, Tab } from '@mui/material';
import NewsletterList from '../components/Newsletter/NewsletterList';
import NewsletterForm from '../components/Newsletter/NewsletterForm';
import NewsletterStats from '../components/Newsletter/NewsletterStats';

const NewsletterPage = () => {
  const { brandId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const handleNewsletterCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Newsletter Management
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Newsletters" />
            <Tab label="Add Newsletter" />
            <Tab label="Statistics" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <NewsletterList 
            key={refreshKey} 
            brandId={brandId} 
            onDelete={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {tabValue === 1 && (
          <NewsletterForm 
            brandId={brandId} 
            onNewsletterCreated={handleNewsletterCreated} 
          />
        )}

        {tabValue === 2 && brandId && (
          <NewsletterStats brandId={brandId} />
        )}
      </Box>
    </Container>
  );
};

export default NewsletterPage;