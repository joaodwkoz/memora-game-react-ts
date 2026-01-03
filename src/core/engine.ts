import type { Card, GameState, Match } from './../types/index';
import { checkMatch } from './check-match';

export function processTurn(gameState: GameState, card1: Card, card2: Card): GameState {
    const newState = {...gameState};

    const match: Match = {
        isMatch: checkMatch(card1, card2),
        card1,
        card2,
    }

    newState.guesses.push(match);

    if (match.isMatch) {
        newState.correctGuesses.push(match);
    }

    if (newState.guesses.length > newState.seed.maxNumberOfMoves && newState.seed.maxNumberOfMoves !== -1) {
        newState.state = 'lost';
    }

    if (newState.correctGuesses.length >= newState.seed.numberOfCards / 2) {
        newState.state = 'won';
    }
    
    return newState;
}

export function isValidMove(game: GameState): boolean {
    return game.state === 'playing';
}
