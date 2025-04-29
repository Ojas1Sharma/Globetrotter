export interface Destination {
    id: number;
    name: string;
    country: string;
    continent: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    clues: string[];
    funFacts: string[];
}

export interface GameSession {
    id: number;
    currentDestination: Destination;
    options: string[];
    completed: boolean;
    score: number;
    startedAt: string;
    endedAt?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    totalScore: number;
    gamesPlayed: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

export interface Challenge {
    id: number;
    challenger: User;
    destination: Destination;
    inviteCode: string;
    createdAt: string;
    expiresAt: string;
    completed: boolean;
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