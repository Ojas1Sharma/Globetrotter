import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Container,
    Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { userService } from '../services/api';

interface LeaderboardEntry {
    username: string;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/leaderboard', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Leaderboard data:', data); // Debug log
                setLeaderboard(data);
            } catch (err) {
                console.error('Error details:', err); // Debug log
                setError(err instanceof Error ? err.message : 'Failed to load leaderboard. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color="error" variant="h6" gutterBottom>
                    {error}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => window.location.reload()}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    if (leaderboard.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    No leaderboard data available yet.
                </Typography>
                <Typography color="text.secondary">
                    Play some games to see your ranking!
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Global Leaderboard
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                    <TableCell align="right">Games Played</TableCell>
                                    <TableCell align="right">Correct Answers</TableCell>
                                    <TableCell align="right">Success Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboard.map((entry, index) => (
                                    <TableRow key={entry.username}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell align="right">{entry.totalScore}</TableCell>
                                        <TableCell align="right">{entry.gamesPlayed}</TableCell>
                                        <TableCell align="right">{entry.correctAnswers}</TableCell>
                                        <TableCell align="right">
                                            {entry.gamesPlayed > 0
                                                ? `${Math.round((entry.correctAnswers / (entry.correctAnswers + entry.incorrectAnswers)) * 100)}%`
                                                : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </Box>
        </Container>
    );
};

export default Leaderboard; 