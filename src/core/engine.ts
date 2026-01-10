import type { GameState, Guess } from './../types/index';
import { checkMatch } from './check-match';

export function processTurn(gameState: GameState): GameState {
    const newState = {...gameState};

    const match = newState.currentMatch;

    newState.state = 'guessing';

    const newGuess: Guess = {
        isCorrect: checkMatch(match.card1!, match.card2!),
        match
    };

    newState.currentGrid = newState.currentGrid.map((card) => {
        const isInCorrectGuess = newGuess.isCorrect && Object.values(newGuess.match).find((c) => card.id === c!.id);
        const wasShownPreviously = card.state === 'shown' && Object.values(newGuess.match).every((c) => card.id !== c!.id);

        return {
            ...card,
            state: isInCorrectGuess || wasShownPreviously ? 'shown' : 'hidden'
        };
    });

    newState.guesses = newState.guesses + (newState.isInOvertime ? 2 : 1);

    if (newGuess.isCorrect) {
        newState.correctGuesses++;
    }

    if (newState.guesses >= newState.seed.maxNumberOfMoves && newState.seed.maxNumberOfMoves !== -1) {
        newState.state = 'lost';
        newState.isInOvertime = false;
    } else if (newState.correctGuesses >= newState.seed.numberOfCards / 2) {
        newState.state = 'won';
        newState.isInOvertime = false;
    } else {
        newState.state = 'playing';
    }

    newState.currentMatch = {
        card1: null,
        card2: null,
    }
    
    return newState;
}

export function isValidMove(game: GameState): boolean {
    return game.state === 'playing';
}
