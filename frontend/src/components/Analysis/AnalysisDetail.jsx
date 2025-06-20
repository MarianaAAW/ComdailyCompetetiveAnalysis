import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysisById } from '../../services/analysisService';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress,
  Divider,
  Chip
} from '@mui/material';
import Loading from '../UI/Loading';

const AnalysisDetail = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysisById(id);
        setAnalysis(data);
      } catch (err) {
        setError(err.message || 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!analysis) return <Typography>Analysis not found</Typography>;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Analysis Report
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Brand: {analysis.brand?.name || 'Unknown Brand'}
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Typography paragraph>
            {analysis.summary}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Detailed Metrics
        </Typography>
        
        {analysis.result_json?.attributes?.map((attr, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>{attr.name}</Typography>
              <Chip 
                label={`${attr.value}/5`} 
                color={
                  attr.value >= 4 ? 'success' : 
                  attr.value <= 2 ? 'error' : 'warning'
                } 
              />
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(attr.value / 5) * 100} 
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 
                    attr.value >= 4 ? 'success.main' : 
                    attr.value <= 2 ? 'error.main' : 'warning.main'
                }
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default AnalysisDetail;