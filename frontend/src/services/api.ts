import axios from 'axios';
import { User, GameSession, Challenge } from '../types';
import { config } from '../config/config';

const api = axios.create({
    baseURL: `${config.API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (username: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/login', null, {
            params: {
                username,
                password
            }
        });
        return response.data;
    },
    register: async (username: string, email: string, password: string): Promise<User> => {
        const response = await api.post('/users/register', null, {
            params: {
                username,
                email,
                password
            }
        });
        return response.data;
    },
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export const userService = {
    updateScore: async (score: number): Promise<User> => {
        const response = await api.patch('/users/score', { score });
        return response.data;
    },
    getProfile: async (): Promise<User> => {
        const response = await api.get('/users/profile');
        return response.data;
    },
    getScore: async (): Promise<{ score: number }> => {
        const response = await api.get('/users/score');
        return response.data;
    }
};

export const gameService = {
    startGame: async (): Promise<GameSession> => {
        const response = await api.post('/game/start');
        return response.data;
    },
    submitAnswer: async (sessionId: string, destinationId: string): Promise<{
        correct: boolean;
        funFacts: string[];
        destinationName: string;
        destinationCountry: string;
        imageUrl: string;
        userScore: number;
        totalGamesPlayed: number;
        description: string;
    }> => {
        const response = await api.post(`/game/${sessionId}/submit`, { destinationId });
        return response.data;
    },
    getClue: async (sessionId: string): Promise<{ clues: string[] }> => {
        const response = await api.get(`/game/${sessionId}`);
        return response.data;
    },
};

export const challengeService = {
    createChallenge: async (destinationId: string): Promise<Challenge> => {
        const response = await api.post('/challenge', { destinationId });
        return response.data;
    },
    acceptChallenge: async (challengeId: string): Promise<GameSession> => {
        const response = await api.post(`/challenge/${challengeId}/accept`);
        return response.data;
    },
};

export default api; 