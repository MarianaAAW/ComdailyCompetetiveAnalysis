import React from 'react';
import { 
  Button as MuiButton,
  CircularProgress
} from '@mui/material';

export const Button = ({ 
  children, 
  loading = false, 
  startIcon, 
  endIcon,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  size = 'medium',
  sx = {},
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={loading}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      size={size}
      sx={{
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      {loading ? (
        <>
          <span style={{ visibility: 'hidden' }}>{children}</span>
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              color: variant === 'contained' ? 'common.white' : 'primary.main'
            }}
          />
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export const IconButton = ({ 
  children, 
  loading = false,
  color = 'primary',
  size = 'medium',
  sx = {},
  ...props 
}) => {
  return (
    <MuiButton
      variant="outlined"
      color={color}
      disabled={loading}
      size={size}
      sx={{ 
        minWidth: 'auto',
        p: 1,
        borderRadius: '50%',
        ...sx
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        children
      )}
    </MuiButton>
  );
};