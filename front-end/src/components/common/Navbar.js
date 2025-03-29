import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch, Avatar, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, Home, Mood, Book, People, ExitToApp } from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Mental Health Companion
          </Link>
        </Typography>
        
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/mood-tracker" startIcon={<Mood />}>
              Mood
            </Button>
            <Button color="inherit" component={Link} to="/journal" startIcon={<Book />}>
              Journal
            </Button>
            <Button color="inherit" component={Link} to="/community" startIcon={<People />}>
              Community
            </Button>
            
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 32, height: 32 }} />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate('/resources'); handleClose(); }}>
                Resources
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
        
        <IconButton onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;