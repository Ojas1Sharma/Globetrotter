import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Auth from './components/Auth';
import Home from './components/Home';
import Game from './components/Game';
import Challenge from './components/Challenge';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            console.log('Auth state changed, token exists:', !!token);
            setIsAuthenticated(!!token);
        };

        // Listen for storage events to update auth state
        window.addEventListener('storage', checkAuth);
        checkAuth(); // Initial check

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
                    <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" />} />
                    <Route path="/game" element={isAuthenticated ? <Game /> : <Navigate to="/auth" />} />
                    <Route path="/challenge" element={isAuthenticated ? <Challenge /> : <Navigate to="/auth" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
