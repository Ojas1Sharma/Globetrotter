import React, { useEffect, useState } from 'react';
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
import api from '../services/api';

interface LeaderboardEntry {
    username: string;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

const Leaderboard: React.FC = () => {
    const [users, setUsers] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get('/users/leaderboard');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch leaderboard');
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

    if (users.length === 0) {
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
                                    <TableCell align="right">Incorrect Answers</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((entry: LeaderboardEntry, index: number) => (
                                    <TableRow key={entry.username}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell align="right">{entry.totalScore}</TableCell>
                                        <TableCell align="right">{entry.gamesPlayed}</TableCell>
                                        <TableCell align="right">{entry.correctAnswers}</TableCell>
                                        <TableCell align="right">{entry.incorrectAnswers}</TableCell>
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