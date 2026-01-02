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

export function validateMove(game: GameState, card1: Card, card2: Card): boolean {
    if (game.state !== 'playing') {
        return false;
    }

    const match: Match = {
        isMatch: checkMatch(card1, card2),
        card1,
        card2,
    }

    game.guesses.push(match);

    if (match.isMatch) {
        game.correctGuesses.push(match);
    }

    return true;
}
