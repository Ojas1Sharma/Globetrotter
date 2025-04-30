import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Paper, 
    Container,
    Fade,
    Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (isRegistering) {
                await authService.register(username, email, password);
                setSuccess('Registration successful! Please login.');
                setIsRegistering(false);
            } else {
                console.log('Starting login process...');
                const { token, user } = await authService.login(username, password);
                console.log('Login successful, token:', token);
                console.log('Login successful, user:', user);
                
                if (!token) {
                    console.error('No token received from login');
                    setError('Login failed: No token received');
                    return;
                }
                
                localStorage.setItem('token', token);
                console.log('Token stored in localStorage');
                
                setSuccess('Login successful!');
                console.log('Setting success message');
                
                // Force a state update to trigger re-render
                window.dispatchEvent(new Event('storage'));
                
                console.log('Navigating to home page...');
                navigate('/', { replace: true });
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                        {isRegistering ? 'Create Account' : 'Welcome to Globetrotter'}
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            required
                            autoFocus
                        />

                        {isRegistering && (
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                required
                            />
                        )}

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isRegistering ? 'Register' : 'Login'}
                        </Button>

                        <Button
                            variant="text"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                                setSuccess('');
                            }}
                        >
                            {isRegistering 
                                ? 'Already have an account? Login' 
                                : "Don't have an account? Register"}
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Auth; 