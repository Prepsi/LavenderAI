import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size = 40, thickness = 4 }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="200px"
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
};

export default LoadingSpinner;