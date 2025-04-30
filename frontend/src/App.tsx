import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Auth from './components/Auth';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';
import ChallengePage from './components/ChallengePage';
import Challenge from './components/Challenge';
import CreateChallengePage from './components/CreateChallengePage';
import { authService } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial authentication state
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" replace />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="/game" element={isAuthenticated ? <Game /> : <Navigate to="/auth" replace />} />
          <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/auth" replace />} />
          <Route path="/challenge/create" element={isAuthenticated ? <CreateChallengePage /> : <Navigate to="/auth" replace />} />
          <Route path="/challenge/:inviteCode" element={<Challenge />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
