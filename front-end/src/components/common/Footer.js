import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[200] 
          : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <MuiLink color="inherit" href="/">
          Mental Health Companion
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'. '}
        <MuiLink color="inherit" href="/privacy">
          Privacy Policy
        </MuiLink>
        {' | '}
        <MuiLink color="inherit" href="/terms">
          Terms of Service
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;