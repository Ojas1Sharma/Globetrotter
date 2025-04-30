export interface User {
    id: number;
    username: string;
    email: string;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

export interface Destination {
    id: number;
    name: string;
    country: string;
    continent: string;
    description: string;
    clues: string[];
    funFacts: string[];
    imageUrl: string;
    latitude: number;
    longitude: number;
    difficulty: string;
}

export interface GameSession {
    sessionId: number;
    clues: string[];
    options: Array<{
        id: number;
        name: string;
        country: string;
    }>;
    difficulty: string;
    currentDestination: {
        id: number;
        name: string;
        country: string;
    };
}

export interface GameState {
    currentSession: GameSession | null;
    user: User | null;
    score: number;
    isGameOver: boolean;
    showConfetti: boolean;
    showFunFacts: boolean;
    funFacts: string[];
} 