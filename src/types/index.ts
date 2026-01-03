import { DIFFICULTIES, TYPE_OF_CARDS } from "../constants/game";

export type CardType = typeof TYPE_OF_CARDS[number];

export type Difficulty = typeof DIFFICULTIES[number];

export type Card = {
    type: CardType,
    state: 'hidden' | 'shown',
    name: string,
    imageUrl: string,
}

export type Seed = {
    type: CardType,
    difficulty: Difficulty,
    numberOfCards: number,
    maxNumberOfMoves: number,
    maxTime: number,
    hasOvertime: boolean,
    startGrid: Card[],
}

export type Match = {
    isMatch: boolean,
    card1: Card,
    card2: Card,
}

export type GameState = {
    state: 'playing' | 'won' | 'lost',
    seed: Seed,
    currentGrid: Card[],
    guesses: Match[],
    correctGuesses: Match[],
} 