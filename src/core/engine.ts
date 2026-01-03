import type { GameState, Match, Guess } from './../types/index';
import { checkMatch } from './check-match';

export function processTurn(gameState: GameState, match: Match): GameState {
    const newState = {...gameState};

    const card1 = match.card1;
    const card2 = match.card2;

    const newGuess: Guess = {
        isCorrect: checkMatch(card1, card2),
        match
    }

    newState.guesses.push(newGuess);

    if (newGuess.isCorrect) {
        newState.correctGuesses.push(newGuess);
    }

    if (newState.guesses.length > newState.seed.maxNumberOfMoves && newState.seed.maxNumberOfMoves !== -1) {
        newState.state = 'lost';
    }

    if (newState.correctGuesses.length >= newState.seed.numberOfCards / 2) {
        newState.state = 'won';
    }
    
    return newState;
}

export function isValidMove(game: GameState, match: Match): boolean {
    return game.state === 'playing';
}
