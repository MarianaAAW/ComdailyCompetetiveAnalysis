import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;