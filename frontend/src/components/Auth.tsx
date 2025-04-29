import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import { authService } from '../services/api';
import { User } from '../types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <div hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
);

const Auth: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
    const [tabValue, setTabValue] = useState(0);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token, user } = await authService.login(loginData.username, loginData.password);
            localStorage.setItem('token', token);
            onLogin(user);
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await authService.register(
                registerData.username,
                registerData.email,
                registerData.password
            );
            setTabValue(0);
            setError('');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Card>
                <CardContent>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <TabPanel value={tabValue} index={0}>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </form>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <form onSubmit={handleRegister}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Register
                            </Button>
                        </form>
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Auth; 