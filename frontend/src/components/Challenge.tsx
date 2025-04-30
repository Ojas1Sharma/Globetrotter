import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { challengeService } from '../services/api';

const Challenge: React.FC = () => {
    const navigate = useNavigate();
    const [friendUsername, setFriendUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChallenge = async () => {
        if (!friendUsername.trim()) {
            setError('Please enter a username');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const challenge = await challengeService.createChallenge();
            setSuccess(`Challenge created! Share this code with your friend: ${challenge.inviteCode}`);
            setTimeout(() => {
                navigate('/game');
            }, 3000);
        } catch (err) {
            setError('Failed to create challenge. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Challenge a Friend
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph align="center">
                        Enter your friend's username to start a challenge
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Friend's Username"
                            variant="outlined"
                            value={friendUsername}
                            onChange={(e) => setFriendUsername(e.target.value)}
                            sx={{ mb: 2 }}
                        />

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

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleChallenge}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Create Challenge'}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Challenge; 