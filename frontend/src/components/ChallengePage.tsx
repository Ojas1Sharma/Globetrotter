import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '../services/api';

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
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Challenge from {challenge?.challenger?.username}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Score: {challenge?.challengerScore}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Correct Answers: {challenge?.challengerCorrectAnswers}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Incorrect Answers: {challenge?.challengerIncorrectAnswers}
                </Typography>
            </Box>
        </Box>
    );
};

export default ChallengePage; 