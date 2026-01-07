import type { Difficulty } from "../types";

export const DIFFICULTIES = [
    { 
        name: 'Muito Fácil',
        color: '#559FF3' 
    },
    { 
        name: 'Fácil',         
        color: '#83DE7E' 
    },
    { 
        name: 'Médio',         
        color: '#F4C152' 
    },
    { 
        name: 'Difícil',      
        color: '#EF5757' 
    },
    { 
        name: 'Muito Difícil', 
        color: '#B83D3D' 
    },
] as const;

export type DifficultyParameter = {
    value: number,
    score: number
};

export const TYPE_OF_CARDS = [
    'animals',
    'fruits',
    'objects',
    'mixed'
] as const;

export const NUMBER_OF_CARDS: number[] = [
    12,
    18,
    24,
]; // Trocar para 18, 24, 30 (primeiro tem que arrumar o layout)

export const NUMBER_OF_MOVES_MULTIPLIERS: DifficultyParameter[] = [
    {
        value: -1,
        score: -1.25,
    },
    {
        value: 6.5,
        score: 1,
    },
    {
        value: 5,
        score: 2.5,
    },
    {
        value: 3.75,
        score: 5,
    },
    {
        value: 2.5,
        score: 7.5,
    },
];

let tempMaxMoves: Record<number, DifficultyParameter[]> = {};

for (const num of NUMBER_OF_CARDS) {
    tempMaxMoves[num] = NUMBER_OF_MOVES_MULTIPLIERS.map(
        (m) => {
            return {
                value: Math.max(Math.floor(num * m.value), -1),
                score: m.score,
            }
        }
    );
}

export const MAX_NUMBER_OF_MOVES = tempMaxMoves;

export const TIME_MULTIPLIERS: DifficultyParameter[] = [
    {
        value: -1,
        score: -1.25,
    },
    {
        value: 6.5,
        score: 1,
    },
    {
        value: 5,
        score: 2.5,
    },
    {
        value: 3.5,
        score: 5,
    },
    {
        value: 2,
        score: 7.5,
    },
]

let tempMaxTime: Record<number, DifficultyParameter[]> = {};

for (const num of NUMBER_OF_CARDS) {
    tempMaxTime[num] = TIME_MULTIPLIERS.map(
        (m) => { 
            return {
                value: Math.max(num * m.value, -1),
                score: m.score,
            }
        }
    );
}

export const MAX_TIME_SECONDS = tempMaxTime;

export const DIFFICULTY_BY_SCORE = (score: number): Difficulty => {
    if (score < 5) {
        return DIFFICULTIES[0];
    } else if(score >= 5) {
        return DIFFICULTIES[1];
    } else if(score >= 7.5) {
        return DIFFICULTIES[2];
    } else if (score >= 10) {
        return DIFFICULTIES[3];
    }

    return DIFFICULTIES[4];
}