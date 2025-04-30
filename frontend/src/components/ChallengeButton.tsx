import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, CircularProgress } from '@mui/material';
import { Share } from '@mui/icons-material';
import api from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

interface ChallengeButtonProps {
    username: string;
}

const ChallengeButton: React.FC<ChallengeButtonProps> = ({ username }) => {
    const [open, setOpen] = useState(false);
    const [challengeData, setChallengeData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateChallenge = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in to create a challenge');
                return;
            }
            console.log('Creating challenge...');
            const challengeResponse = await api.post(`/api/challenges?username=${encodeURIComponent(username)}`);
            console.log('Challenge created successfully:', challengeResponse.data);
            setChallengeData(challengeResponse.data);
            setOpen(true);
        } catch (error) {
            console.error('Error creating challenge:', error);
            setError('Failed to create challenge. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setChallengeData(null);
        setError(null);
    };

    const handleShare = () => {
        if (challengeData?.shareUrl) {
            const whatsappUrl = `https://wa.me/?text=Challenge me in Globetrotter! My score: ${challengeData.challengerScore} (${challengeData.challengerCorrectAnswers} correct, ${challengeData.challengerIncorrectAnswers} incorrect). Join here: ${challengeData.shareUrl}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Share />}
                onClick={handleCreateChallenge}
                disabled={loading}
                sx={{ minWidth: '200px' }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Challenge a Friend'}
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Share Challenge</DialogTitle>
                <DialogContent>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {challengeData && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Your Score: {challengeData.challengerScore}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Correct Answers: {challengeData.challengerCorrectAnswers}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Incorrect Answers: {challengeData.challengerIncorrectAnswers}
                            </Typography>
                            <Box sx={{ my: 3 }}>
                                <QRCodeSVG value={challengeData.shareUrl} size={200} level="H" />
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Share this QR code or the link below:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    wordBreak: 'break-all',
                                    bgcolor: 'grey.100',
                                    p: 1,
                                    borderRadius: 1
                                }}
                            >
                                {challengeData.shareUrl}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button 
                        onClick={handleShare} 
                        variant="contained" 
                        color="primary" 
                        disabled={!challengeData}
                        startIcon={<Share />}
                    >
                        Share on WhatsApp
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChallengeButton; 