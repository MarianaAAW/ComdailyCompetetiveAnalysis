import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { getNewsletterStats } from '../../services/newsletterService';

const NewsletterStats = ({ brandId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getNewsletterStats(brandId);
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    
    if (brandId) {
      fetchStats();
    }
  }, [brandId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!stats) return <Typography>No statistics available</Typography>;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Newsletter Statistics
      </Typography>
      
      <List>
        <ListItem>
          <ListItemText
            primary="Total Newsletters"
            secondary={stats.total_count}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Text Newsletters"
            secondary={stats.by_type.text || 0}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="PDF Newsletters"
            secondary={stats.by_type.pdf || 0}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="DOC Newsletters"
            secondary={stats.by_type.doc || 0}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Last Created"
            secondary={new Date(stats.last_created).toLocaleString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default NewsletterStats;