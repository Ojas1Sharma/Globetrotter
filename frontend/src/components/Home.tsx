import React from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Container, 
    Card, 
    CardContent, 
    CardActions,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';
import ChallengeButton from './ChallengeButton';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const username = localStorage.getItem('username');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const features = [
        {
            icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
            title: 'Start New Game',
            description: 'Test your knowledge of world landmarks and destinations',
            action: () => navigate('/game'),
            color: theme.palette.primary.main
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
            title: 'View Leaderboard',
            description: 'See how you rank against other globetrotters',
            action: () => navigate('/leaderboard'),
            color: theme.palette.secondary.main
        },
        {
            icon: <PublicIcon sx={{ fontSize: 40 }} />,
            title: 'Create Challenge',
            description: 'Challenge your friends to beat your score',
            action: () => navigate('/challenge/create'),
            color: '#10b981'
        }
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Typography 
                            variant="h2" 
                            component="h1" 
                            align="center" 
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            Welcome to Globetrotter
                        </Typography>
                        <Typography 
                            variant="h5" 
                            align="center" 
                            color="text.secondary" 
                            sx={{ mb: 6 }}
                        >
                            Test your knowledge of world landmarks and destinations
                        </Typography>
                    </motion.div>

                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 4,
                        justifyContent: 'center'
                    }}>
                        {features.map((feature, index) => (
                            <Box 
                                key={index} 
                                sx={{ 
                                    width: { xs: '100%', md: '30%' },
                                    minWidth: { md: '300px' }
                                }}
                            >
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                >
                                    <Card 
                                        sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            background: 'linear-gradient(145deg, #ffffff, #f0f4ff)',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                            <Box 
                                                sx={{ 
                                                    display: 'inline-flex',
                                                    p: 2,
                                                    borderRadius: '50%',
                                                    bgcolor: `${feature.color}15`,
                                                    color: feature.color,
                                                    mb: 2
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                            <Typography 
                                                variant="h5" 
                                                component="h2" 
                                                gutterBottom
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                                            <Button
                                                variant="contained"
                                                onClick={feature.action}
                                                sx={{
                                                    background: `linear-gradient(45deg, ${feature.color}, ${feature.color}dd)`,
                                                    '&:hover': {
                                                        background: `linear-gradient(45deg, ${feature.color}dd, ${feature.color})`,
                                                    }
                                                }}
                                            >
                                                Get Started
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {username && <ChallengeButton username={username} />}
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
};

export default Home; 