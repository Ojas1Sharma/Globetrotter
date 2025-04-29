import axios from 'axios';
import { Destination, GameSession, User, Challenge } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const gameService = {
    startNewGame: async (): Promise<GameSession> => {
        const response = await api.post('/game/start');
        return response.data;
    },

    submitAnswer: async (gameSessionId: number, answer: string): Promise<{
        correct: boolean;
        funFacts: string[];
        score: number;
    }> => {
        const response = await api.post(`/game/${gameSessionId}/submit`, { answer });
        return response.data;
    },

    getFunFacts: async (gameSessionId: number): Promise<string[]> => {
        const response = await api.get(`/game/${gameSessionId}/fun-facts`);
        return response.data;
    },
};

export const challengeService = {
    createChallenge: async (): Promise<Challenge> => {
        const response = await api.post('/challenge/create');
        return response.data;
    },

    getChallenge: async (inviteCode: string): Promise<Challenge> => {
        const response = await api.get(`/challenge/${inviteCode}`);
        return response.data;
    },

    acceptChallenge: async (inviteCode: string): Promise<GameSession> => {
        const response = await api.post(`/challenge/${inviteCode}/accept`);
        return response.data;
    },
};

export const authService = {
    login: async (username: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    register: async (username: string, email: string, password: string): Promise<User> => {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get('/auth/me');
        return response.data;
    },
}; 