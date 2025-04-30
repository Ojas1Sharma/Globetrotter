import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { gameService } from '../services/api';
import { userService } from '../services/api';

type GameSession = Awaited<ReturnType<typeof gameService.startNewGame>> & {
    currentDestination?: {
        id: number;
        name: string;
        country: string;
    };
};

interface GameState {
    currentSession: GameSession | null;
    score: number;
    isGameOver: boolean;
    showConfetti: boolean;
    showFunFacts: boolean;
    funFacts: string[];
    currentClueIndex: number;
}

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentSession: null,
        score: 0,
        isGameOver: false,
        showConfetti: false,
        showFunFacts: false,
        funFacts: [],
        currentClueIndex: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        try {
            const session = await gameService.startNewGame();
            console.log('New game session:', session);
            setGameState((prev: GameState) => ({
                ...prev,
                currentSession: session,
                isGameOver: false,
                showConfetti: false,
                showFunFacts: false,
                funFacts: [],
                currentClueIndex: 0,
            }));
            setLoading(false);
        } catch (error) {
            console.error('Error starting new game:', error);
            setLoading(false);
        }
    };

    const handleAnswer = async (option: { id: number; name: string; country: string }) => {
        if (!gameState.currentSession) return;

        try {
            const result = await gameService.submitAnswer(gameState.currentSession.sessionId, option.id);
            console.log('Answer result:', result);

            setGameState((prev: GameState) => ({
                ...prev,
                isGameOver: true,
                showConfetti: result.correct,
                showFunFacts: true,
                funFacts: result.funFacts,
                score: result.userScore,
                currentSession: {
                    ...prev.currentSession!,
                    currentDestination: {
                        id: option.id,
                        name: result.destinationName,
                        country: result.destinationCountry
                    }
                }
            }));

            // Update the user's score in the backend
            await userService.updateUserScore(result.userScore);
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    const handleNextQuestion = async () => {
        setLoading(true);
        await startNewGame();
    };

    const showNextClue = () => {
        if (gameState.currentSession && gameState.currentClueIndex < gameState.currentSession.clues.length - 1) {
            setGameState((prev: GameState) => ({
                ...prev,
                currentClueIndex: prev.currentClueIndex + 1,
            }));
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
                                Clue {gameState.currentClueIndex + 1}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {gameState.currentSession.clues[gameState.currentClueIndex]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Difficulty: {gameState.currentSession.difficulty}
                            </Typography>
                        </>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={showNextClue}
                        disabled={!gameState.currentSession || gameState.currentClueIndex >= gameState.currentSession.clues.length - 1}
                    >
                        Show Next Clue
                    </Button>
                </CardActions>
            </Card>

            {gameState.currentSession && !gameState.isGameOver && (
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    {gameState.currentSession.options.map((option) => (
                        <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => handleAnswer(option)}
                                sx={{ height: 100 }}
                            >
                                {option.name}
                                <Typography variant="caption" display="block">
                                    {option.country}
                                </Typography>
                            </Button>
                        </motion.div>
                    ))}
                </Box>
            )}

            {gameState.isGameOver && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {gameState.showConfetti ? 'Correct!' : 'Incorrect!'}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The answer was: {gameState.currentSession?.currentDestination?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Fun Facts:
                    </Typography>
                    {gameState.funFacts.map((fact, index) => (
                        <Typography key={index} variant="body1" paragraph>
                            {fact}
                        </Typography>
                    ))}
                    <Typography variant="h6" gutterBottom>
                        Your Score: {gameState.score}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextQuestion}
                        sx={{ mt: 2 }}
                    >
                        Next Question
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Game; 