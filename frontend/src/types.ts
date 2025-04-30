export interface User {
    id: string;
    username: string;
    email: string;
    score: number;
}

export interface Destination {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    clues: string[];
    funFact: string;
}

export interface GameSession {
    id: string;
    userId: string;
    currentDestination: Destination;
    score: number;
    isComplete: boolean;
    startTime: string;
    endTime?: string;
}

export interface Challenge {
    id: string;
    destinationId: string;
    creatorId: string;
    acceptorId?: string;
    status: 'PENDING' | 'ACCEPTED' | 'COMPLETED';
    createdAt: string;
    completedAt?: string;
} 