import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { gameService } from '../services/api';
import { userService } from '../services/api';

interface Option {
    id: number;
    name: string;
    country: string;
}

interface GameSession {
    sessionId: number;
    clues: string[];
    options: Option[];
    difficulty: string;
    currentDestination?: {
        id: number;
        name: string;
        country: string;
    };
}

interface GameState {
    currentSession: GameSession | null;
    isGameOver: boolean;
    showConfetti: boolean;
    showFunFacts: boolean;
    funFacts: string[];
    score: number;
    currentClueIndex: number;
    correctAnswer?: {
        name: string;
        country: string;
    };
}

interface ChallengeData {
    challenger: {
        username: string;
    };
    challengerScore: number;
    challengerCorrectAnswers: number;
    challengerIncorrectAnswers: number;
}

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentSession: null,
        isGameOver: false,
        showConfetti: false,
        showFunFacts: false,
        funFacts: [],
        score: 0,
        currentClueIndex: 0
    });
    const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);

    useEffect(() => {
        // Check for challenge data
        const storedChallenge = localStorage.getItem('challengeData');
        if (storedChallenge) {
            setChallengeData(JSON.parse(storedChallenge));
            localStorage.removeItem('challengeData'); // Clear after reading
        }

        // Initialize score from backend
        const initializeScore = async () => {
            try {
                const { score } = await userService.getScore();
                setGameState(prev => ({ ...prev, score }));
            } catch (error) {
                console.error('Error fetching initial score:', error);
            }
        };
        initializeScore();
    }, []);

    const startNewGame = async () => {
        try {
            const session = await gameService.startGame();
            console.log('New game session:', session);
            setGameState({
                currentSession: session,
                isGameOver: false,
                showConfetti: false,
                showFunFacts: false,
                funFacts: [],
                currentClueIndex: 0,
                score: gameState.score,
                correctAnswer: undefined
            });
        } catch (error) {
            console.error('Error starting new game:', error);
        }
    };

    const handleAnswer = async (option: Option) => {
        if (!gameState.currentSession) return;

        try {
            const result = await gameService.submitAnswer(
                gameState.currentSession.sessionId.toString(),
                option.id.toString()
            );
            console.log('Answer result:', result);

            const newScore = gameState.score + (result.correct ? 100 : 0);
            
            // Update score in backend
            try {
                await userService.updateScore(newScore);
            } catch (error) {
                console.error('Error updating score:', error);
                // Continue with the game even if score update fails
            }

            setGameState(prev => ({
                ...prev,
                isGameOver: true,
                showConfetti: result.correct,
                showFunFacts: true,
                funFacts: result.funFacts,
                score: newScore,
                correctAnswer: {
                    name: result.destinationName,
                    country: result.destinationCountry
                }
            }));
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    const showNextClue = async () => {
        if (!gameState.currentSession) return;

        try {
            const result = await gameService.getClue(gameState.currentSession.sessionId.toString());
            setGameState(prev => ({
                ...prev,
                currentClueIndex: prev.currentClueIndex + 1,
                currentSession: {
                    ...prev.currentSession!,
                    clues: result.clues
                }
            }));
        } catch (error) {
            console.error('Error getting clue:', error);
        }
    };

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

            {challengeData && (
                <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                        Challenge from {challengeData.challenger.username}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                        <Typography>
                            Score to beat: {challengeData.challengerScore}
                        </Typography>
                        <Typography>
                            Correct Answers: {challengeData.challengerCorrectAnswers}
                        </Typography>
                        <Typography>
                            Incorrect Answers: {challengeData.challengerIncorrectAnswers}
                        </Typography>
                    </Box>
                </Paper>
            )}

            {!gameState.currentSession ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to Globetrotter!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={startNewGame}
                        sx={{ mt: 2 }}
                    >
                        Start New Game
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Score: {gameState.score}
                    </Typography>

                    {gameState.currentClueIndex < gameState.currentSession.clues.length ? (
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Clue {gameState.currentClueIndex + 1}:
                                </Typography>
                                <Typography variant="body1">
                                    {gameState.currentSession.clues[gameState.currentClueIndex]}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={showNextClue}
                                    sx={{ mt: 2 }}
                                    disabled={gameState.currentClueIndex === gameState.currentSession.clues.length - 1}
                                >
                                    Show Next Clue
                                </Button>
                            </CardContent>
                        </Card>
                    ) : null}

                    {gameState.currentSession && !gameState.isGameOver && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                            {gameState.currentSession.options.map((option) => (
                                <motion.div
                                    key={option.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => handleAnswer(option)}
                                        sx={{ height: '100px' }}
                                    >
                                        {option.name}, {option.country}
                                    </Button>
                                </motion.div>
                            ))}
                        </Box>
                    )}

                    {gameState.isGameOver && (
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {gameState.showConfetti ? 'Correct!' : 'Incorrect!'}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    The answer was: {gameState.correctAnswer?.name}, {gameState.correctAnswer?.country}
                                </Typography>
                                {gameState.showFunFacts && (
                                    <>
                                        <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                                            Fun Facts:
                                        </Typography>
                                        {gameState.funFacts.map((fact, index) => (
                                            <Typography key={index} variant="body1" gutterBottom>
                                                • {fact}
                                            </Typography>
                                        ))}
                                    </>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={startNewGame}
                                    sx={{ mt: 2 }}
                                >
                                    Next
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Game; 