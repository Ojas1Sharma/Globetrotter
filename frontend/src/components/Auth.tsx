import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Paper, 
    Container,
    Fade,
    Alert,
    Grid,
    Divider,
    IconButton,
    InputAdornment
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Auth: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                const { token, user } = await authService.login(username, password);
                localStorage.setItem('token', token);
                // Dispatch a storage event to update the auth state in App component
                window.dispatchEvent(new Event('storage'));
                setSuccess('Login successful!');
                navigate('/', { replace: true });
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4, 
                        width: '100%',
                        background: 'linear-gradient(145deg, #ffffff, #f0f4ff)',
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            gutterBottom 
                            align="center"
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {isRegistering ? 'Create Account' : 'Welcome Back'}
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            align="center" 
                            sx={{ mb: 4 }}
                        >
                            {isRegistering 
                                ? 'Join our community of globetrotters' 
                                : 'Sign in to continue your journey'}
                        </Typography>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <motion.div variants={itemVariants}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </motion.div>

                        {isRegistering && (
                            <motion.div
                                variants={itemVariants}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 3 }}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={isRegistering ? <PersonAddIcon /> : <LoginIcon />}
                                sx={{ 
                                    mb: 2,
                                    py: 1.5,
                                    background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1e40af, #5b21b6)',
                                    },
                                }}
                            >
                                {isRegistering ? 'Sign Up' : 'Sign In'}
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => setIsRegistering(!isRegistering)}
                                sx={{ 
                                    color: 'text.secondary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {isRegistering 
                                    ? 'Already have an account? Sign in' 
                                    : "Don't have an account? Sign up"}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Auth; 