import type { ComponentType, SVGProps } from 'react';
import { DIFFICULTIES, TYPE_OF_CARDS } from "../constants/game";

export type CardType = typeof TYPE_OF_CARDS[number];

export type Difficulty = typeof DIFFICULTIES[number];

export type Card = {
    id: number | string,
    type: CardType,
    state: 'hidden' | 'shown',
    name: string,
    svg: ComponentType<SVGProps<SVGSVGElement>> | null,
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
    card1: Card | null,
    card2: Card | null,
}

export type Guess = {
    isCorrect: boolean,
    match: Match,
}

export type GameState = {
    state: 'playing' | 'won' | 'lost' | 'guessing',
    seed: Seed,
    currentGrid: Card[],
    guesses: Guess[],
    correctGuesses: Guess[],
    currentMatch: Match,
} 