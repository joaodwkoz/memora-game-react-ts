export type CardType = 'animals' | 'fruits' | 'objects' | 'mixed'

export type Difficulty = {
    name: 'Muito Fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil',
    color: string,
}

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
    numberOfMoves: number,
    time: number,
    isOvertime: boolean,
    startGrid: Card[],
}

export type Match = {
    isMatch: boolean,
    card1: Card,
    card2: Card,
}

export type GameState = {
    state: 'playing' | 'won' | 'lost',
    seed: Seed | null,
    grid: Card[],
    guesses: Match[],
} 