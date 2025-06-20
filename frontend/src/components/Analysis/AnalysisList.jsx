import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysisByBrand } from '../../services/analysisService';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import Loading from '../UI/Loading';

const AnalysisList = ({ brandId }) => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysisByBrand(brandId);
        setAnalysisResults(data);
      } catch (err) {
        setError(err.message || 'Failed to load analysis results');
      } finally {
        setLoading(false);
      }
    };
    
    if (brandId) {
      fetchAnalysis();
    }
  }, [brandId]);

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      {analysisResults.length === 0 ? (
        <Typography variant="body1">No analysis results found.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {analysisResults.map((result) => (
            <Card key={result.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Analysis #{result.id}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {new Date(result.created_at).toLocaleString()} {/* Add created_at to your model */}
                </Typography>
                <Typography paragraph sx={{ mt: 1 }}>
                  <strong>Summary:</strong> {result.summary}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    component={Link}
                    to={`/analysis/${result.id}`}
                    variant="outlined"
                    size="small"
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AnalysisList;