import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ChallengeButton from './ChallengeButton';

const CreateChallengePage: React.FC = () => {
    const username = localStorage.getItem('username') || '';
    return (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create a New Challenge
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <ChallengeButton username={username} />
            </Box>
        </Container>
    );
};

export default CreateChallengePage; 