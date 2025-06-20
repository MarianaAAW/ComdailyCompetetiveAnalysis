import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  Article as DocIcon
} from '@mui/icons-material';
import { 
  getNewslettersByBrand, 
  deleteNewsletter 
} from '../../services/newsletterService';
import Loading from '../UI/Loading';

const NewsletterList = ({ brandId, onDelete }) => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsletterToDelete, setNewsletterToDelete] = useState(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const data = await getNewslettersByBrand(brandId);
        setNewsletters(data);
      } catch (err) {
        setError(err.message || 'Failed to load newsletters');
      } finally {
        setLoading(false);
      }
    };
    
    if (brandId) {
      fetchNewsletters();
    }
  }, [brandId, onDelete]);

  const handleDeleteClick = (newsletter) => {
    setNewsletterToDelete(newsletter);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteNewsletter(newsletterToDelete.id);
      onDelete();
    } catch (err) {
      setError(err.message || 'Failed to delete newsletter');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const getContentIcon = (contentType) => {
    switch(contentType.toLowerCase()) {
      case 'pdf': return <PdfIcon />;
      case 'doc': return <DocIcon />;
      default: return <DescriptionIcon />;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {newsletters.length === 0 ? (
        <Typography variant="body1">No newsletters found for this brand.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  {getContentIcon(newsletter.content_type)}
                  <Typography variant="h6" component="div">
                    {newsletter.content_type.toUpperCase()} Newsletter
                  </Typography>
                  <Chip 
                    label={newsletter.content_type} 
                    size="small" 
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(newsletter.created_at).toLocaleDateString()}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mt: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {newsletter.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                  onClick={() => setPreviewContent(newsletter.content)}
                  aria-label="preview"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDeleteClick(newsletter)}
                  aria-label="delete"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={!!previewContent}
        onClose={() => setPreviewContent(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Newsletter Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ 
            whiteSpace: 'pre-wrap',
            p: 2,
            border: '1px solid #eee',
            borderRadius: 1,
            maxHeight: '60vh',
            overflow: 'auto'
          }}>
            {previewContent}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewContent(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Newsletter</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {newsletterToDelete?.content_type} newsletter?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsletterList;