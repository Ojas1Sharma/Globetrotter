import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, TextField, Snackbar } from '@mui/material';
import { Share as ShareIcon } from '@mui/icons-material';
import { challengeService } from '../services/api';
import { Challenge as ChallengeType } from '../types';

const Challenge: React.FC = () => {
    const [challenge, setChallenge] = useState<ChallengeType | null>(null);
    const [inviteCode, setInviteCode] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const createChallenge = async () => {
        try {
            const newChallenge = await challengeService.createChallenge();
            setChallenge(newChallenge);
            setSnackbar({ open: true, message: 'Challenge created successfully!' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error creating challenge' });
        }
    };

    const acceptChallenge = async () => {
        try {
            const gameSession = await challengeService.acceptChallenge(inviteCode);
            setSnackbar({ open: true, message: 'Challenge accepted! Starting game...' });
            // Redirect to game with the session
            window.location.href = `/game/${gameSession.id}`;
        } catch (error) {
            setSnackbar({ open: true, message: 'Error accepting challenge' });
        }
    };

    const shareChallenge = () => {
        if (challenge) {
            const shareUrl = `${window.location.origin}/challenge/${challenge.inviteCode}`;
            navigator.clipboard.writeText(shareUrl);
            setSnackbar({ open: true, message: 'Challenge link copied to clipboard!' });
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Challenge a Friend
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createChallenge}
                        sx={{ mb: 2 }}
                    >
                        Create New Challenge
                    </Button>

                    {challenge && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                Share this challenge with your friends:
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<ShareIcon />}
                                onClick={shareChallenge}
                                sx={{ mt: 1 }}
                            >
                                Share Challenge
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Accept a Challenge
                    </Typography>
                    <TextField
                        fullWidth
                        label="Enter Challenge Code"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={acceptChallenge}
                        disabled={!inviteCode}
                    >
                        Accept Challenge
                    </Button>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Box>
    );
};

export default Challenge; 