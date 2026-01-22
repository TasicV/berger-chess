export interface Player {
    id: string;
    startNumber: number;
    title: string;
    surname: string;
    name: string;
    rating: number;
    federation: string;
    club: string;
    sex: string;
}

export interface Match {
    id?: string;
    round: number;
    board: number;
    whitePlayerId: string;
    whitePlayerName: string;
    whiteRating?: number;
    blackPlayerId: string;
    blackPlayerName: string;
    blackRating?: number;
    result?: '1-0' | '0-1' | '1/2-1/2' | '*';
}

export interface Tournament {
    id?: string;
    name: string;
    city: string;
    organizer?: string;
    startDate: string;
    endDate?: string;
    timeControl?: string;
    referee?: string;
    doubleRoundRobin: boolean;
    players: Player[];
}

export interface Round {
    roundNumber: number;
    matches: Match[];
}

export interface Standing {
    playerId: string;
    playerName: string;
    playerTitle: string;
    position: number;
    points: number;
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    directEncounter: number;  // Direct Encounter (Head to Head) - samo između onih sa istim poenom
    sonneborn: number;
    whitePoints: number;
}

export interface Game {
    id?: string;
    whitePlayerId: string;
    blackPlayerId: string;
    whiteName: string;
    blackName: string;
    round: number;
    board: number;
    result?: '1-0' | '0-1' | '1/2-1/2' | '*';
    whiteRating?: number;
    blackRating?: number;
}