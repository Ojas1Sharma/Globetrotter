import React from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Container, 
    Paper,
    Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                        Welcome to Globetrotter
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
                        The Ultimate Travel Guessing Game
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={() => navigate('/game')}
                                    sx={{ height: 100, fontSize: '1.2rem' }}
                                >
                                    Start New Game
                                </Button>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    fullWidth
                                    onClick={() => navigate('/challenge')}
                                    sx={{ height: 100, fontSize: '1.2rem' }}
                                >
                                    Challenge a Friend
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            Test your knowledge of world destinations with cryptic clues and fun facts!
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Home; 