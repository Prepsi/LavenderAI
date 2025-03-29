import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link as MuiLink, 
  Alert,
  Divider
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <MuiLink 
              href="/forgot-password" 
              variant="body2" 
              sx={{ textDecoration: 'none' }}
            >
              Forgot password?
            </MuiLink>
            <MuiLink 
              href="/register" 
              variant="body2" 
              sx={{ textDecoration: 'none' }}
            >
              Don't have an account? Sign Up
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;