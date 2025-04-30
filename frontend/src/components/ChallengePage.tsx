import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';

interface ChallengeData {
    challenger: {
        username: string;
    };
    challengerScore: number;
    challengerCorrectAnswers: number;
    challengerIncorrectAnswers: number;
}

const ChallengePage: React.FC = () => {
    const { inviteCode } = useParams<{ inviteCode: string }>();
    const navigate = useNavigate();
    const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/challenges/${inviteCode}`);
                setChallengeData(response.data);
            } catch (error) {
                setError('Invalid or expired challenge link');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [inviteCode]);

    const handleStartGame = () => {
        // Store the invite code in localStorage for the game to use
        localStorage.setItem('challengeInviteCode', inviteCode || '');
        navigate('/game');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Challenge from {challengeData?.challenger.username}
                </Typography>
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Challenger's Stats:
                    </Typography>
                    <Typography>Total Score: {challengeData?.challengerScore}</Typography>
                    <Typography>Correct Answers: {challengeData?.challengerCorrectAnswers}</Typography>
                    <Typography>Incorrect Answers: {challengeData?.challengerIncorrectAnswers}</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleStartGame}
                >
                    Accept Challenge
                </Button>
            </Paper>
        </Box>
    );
};

export default ChallengePage; 