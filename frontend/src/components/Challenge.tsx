import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper, Divider } from '@mui/material';
import api from '../services/api';

interface ChallengeData {
    challenger: {
        username: string;
    };
    challengerScore: number;
    challengerCorrectAnswers: number;
    challengerIncorrectAnswers: number;
}

const Challenge: React.FC = () => {
    const { inviteCode } = useParams<{ inviteCode: string }>();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await api.get(`/challenges/${inviteCode}`);
                setChallenge(response.data);
            } catch (err) {
                setError('Challenge not found or has expired');
            } finally {
                setLoading(false);
            }
        };

        if (inviteCode) {
            fetchChallenge();
        }
    }, [inviteCode]);

    const handleAcceptChallenge = () => {
        // Store the challenge data in localStorage for the game to use
        localStorage.setItem('challengeData', JSON.stringify(challenge));
        navigate('/game');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        {error}
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/')}>
                        Go Home
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Challenge from {challenge?.challenger?.username}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Challenger's Stats:
                    </Typography>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: 2,
                        textAlign: 'center',
                        mt: 2
                    }}>
                        <Box>
                            <Typography variant="h4" color="primary">
                                {challenge?.challengerScore}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Score
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" color="success.main">
                                {challenge?.challengerCorrectAnswers}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Correct Answers
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" color="error.main">
                                {challenge?.challengerIncorrectAnswers}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Incorrect Answers
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 4 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleAcceptChallenge}
                    >
                        Accept Challenge
                    </Button>
                    <Button 
                        variant="outlined" 
                        size="large"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Challenge; 