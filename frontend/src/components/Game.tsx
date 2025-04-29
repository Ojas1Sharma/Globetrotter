import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { gameService } from '../services/api';
import { GameState, GameSession } from '../types';

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentSession: null,
        user: null,
        score: 0,
        isGameOver: false,
        showConfetti: false,
        showFunFacts: false,
        funFacts: [],
    });
    const [loading, setLoading] = useState(true);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        try {
            setLoading(true);
            const session = await gameService.startNewGame();
            setGameState(prev => ({
                ...prev,
                currentSession: session,
                isGameOver: false,
                showConfetti: false,
                showFunFacts: false,
                funFacts: [],
            }));
            setCurrentClueIndex(0);
        } catch (error) {
            console.error('Error starting new game:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = async (answer: string) => {
        if (!gameState.currentSession) return;

        try {
            const result = await gameService.submitAnswer(gameState.currentSession.id, answer);
            const funFacts = await gameService.getFunFacts(gameState.currentSession.id);

            setGameState(prev => ({
                ...prev,
                isGameOver: true,
                showConfetti: result.correct,
                showFunFacts: true,
                funFacts,
                score: result.score,
            }));
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    const showNextClue = () => {
        if (gameState.currentSession && currentClueIndex < gameState.currentSession.currentDestination.clues.length - 1) {
            setCurrentClueIndex(prev => prev + 1);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <AnimatePresence>
                {gameState.showConfetti && (
                    <ReactConfetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                    />
                )}
            </AnimatePresence>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Score: {gameState.score}
                    </Typography>
                    {gameState.currentSession && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Clue {currentClueIndex + 1}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {gameState.currentSession.currentDestination.clues[currentClueIndex]}
                            </Typography>
                        </>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={showNextClue}
                        disabled={!gameState.currentSession || currentClueIndex >= gameState.currentSession.currentDestination.clues.length - 1}
                    >
                        Show Next Clue
                    </Button>
                </CardActions>
            </Card>

            {gameState.currentSession && !gameState.isGameOver && (
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    {gameState.currentSession.options.map((option, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => handleAnswer(option)}
                                sx={{ height: 100 }}
                            >
                                {option}
                            </Button>
                        </motion.div>
                    ))}
                </Box>
            )}

            {gameState.isGameOver && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Fun Facts:
                    </Typography>
                    {gameState.funFacts.map((fact, index) => (
                        <Typography key={index} variant="body1" paragraph>
                            {fact}
                        </Typography>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={startNewGame}
                        sx={{ mt: 2 }}
                    >
                        Play Again
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Game; 