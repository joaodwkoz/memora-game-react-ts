import type { Card, GameState, Match } from './../types/index';
import { checkMatch } from './check-match';

export function updateGame(game: GameState): void {
    if (game.state !== 'playing') {
        return;
    }   

    if (game.guesses.length > game.seed.numberOfMoves && game.seed.numberOfMoves !== -1) {
        game.state = 'lost';
        return;
    }

    if (game.correctGuesses.length >= game.seed.numberOfCards / 2) {
        game.state = 'won';
        return;
    }
}

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
    
    return newState;
}

export function isValidMove(game: GameState): boolean {
    return game.state === 'playing';
}
