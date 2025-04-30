import axios from 'axios';
import { Destination, GameSession, User, Challenge } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

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
    startNewGame: async (): Promise<{
        sessionId: number;
        clues: string[];
        options: Array<{
            id: number;
            name: string;
            country: string;
        }>;
        difficulty: string;
    }> => {
        const response = await api.post('/game/start');
        return response.data;
    },

    submitAnswer: async (gameSessionId: number, destinationId: number): Promise<{
        correct: boolean;
        funFacts: string[];
        destinationName: string;
        destinationCountry: string;
        imageUrl: string;
        userScore: number;
        totalGamesPlayed: number;
        description: string;
    }> => {
        const response = await api.post(`/game/${gameSessionId}/submit`, { destinationId });
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
        console.log('Attempting login for user:', username);
        const response = await api.post(`/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        console.log('Login response:', response.data);
        return response.data;
    },

    register: async (username: string, email: string, password: string): Promise<User> => {
        const response = await api.post(`/users/register?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export const userService = {
    register: async (username: string, password: string) => {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, {
            username,
            password
        });
        return response.data;
    },
    login: async (username: string, password: string) => {
        const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
            username,
            password
        });
        return response.data;
    },
    updateUserScore: async (score: number) => {
        const response = await axios.put(`${API_BASE_URL}/api/users/score`, {
            score
        });
        return response.data;
    }
}; 