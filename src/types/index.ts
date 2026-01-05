import type { ComponentType, SVGProps } from 'react';
import { DIFFICULTIES, TYPE_OF_CARDS } from "../constants/game";

export type CardType = typeof TYPE_OF_CARDS[number];

export type Difficulty = typeof DIFFICULTIES[number];

export type Card = {
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
    card1: Card,
    card2: Card,
}

export type Guess = {
    isCorrect: boolean,
    match: Match,
}

export type GameState = {
    state: 'playing' | 'won' | 'lost',
    seed: Seed,
    currentGrid: Card[],
    guesses: Guess[],
    correctGuesses: Guess[],
} 