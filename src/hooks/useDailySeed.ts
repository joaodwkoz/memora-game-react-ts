import type { GameState, Seed, Card } from "../types";
import { prng } from "../core/prng";
import { generateSeed } from "../core/daily-seed";
import { DIFFICULTY_BY_SCORE, MAX_NUMBER_OF_MOVES, MAX_TIME_SECONDS, NUMBER_OF_CARDS, TYPE_OF_CARDS } from '../constants/game';
import { CARDS } from "../constants/cards";

export function useDailySeed(date?: Date | null) {
    const seed = generateSeed(date);
    const rng = prng(seed);

    const generateRandomNumber = (m?: number | null): number => {
        const randomGeneratedNumber = rng();

        return m ? randomGeneratedNumber % m : randomGeneratedNumber;
    }

    const randomTypeOfCards = generateRandomNumber(TYPE_OF_CARDS.length);
    const gameTypeOfCards = TYPE_OF_CARDS[randomTypeOfCards];

    const randomNumberOfCards = generateRandomNumber(NUMBER_OF_CARDS.length);
    const gameNumberOfCards = NUMBER_OF_CARDS[randomNumberOfCards];

    const generatedMaxNumberOfMoves = MAX_NUMBER_OF_MOVES[gameNumberOfCards];
    const randomMaxNumberOfMoves = generateRandomNumber(generatedMaxNumberOfMoves.length);
    const gameMaxNumberOfMoves = generatedMaxNumberOfMoves[randomMaxNumberOfMoves];

    const generatedMaxTimeSeconds = MAX_TIME_SECONDS[gameNumberOfCards];
    const randomMaxTime = generateRandomNumber(generatedMaxTimeSeconds.length);
    const gameMaxTime = generatedMaxTimeSeconds[randomMaxTime];

    const randomHasOvertime = generateRandomNumber(20);
    const gameHasOvertime = randomHasOvertime > 17;

    const difficultyPoints = gameMaxNumberOfMoves.score + gameMaxNumberOfMoves.score + gameMaxTime.score + (gameHasOvertime ? 5: 0);
    const gameDifficulty = DIFFICULTY_BY_SCORE(difficultyPoints);

    const tempGrid: Card[] = Array(gameNumberOfCards);
    let numSelectedCards: number = 0;

    while (numSelectedCards < gameNumberOfCards) {
        const randomPositionGrid: number = generateRandomNumber() % gameNumberOfCards;
        const randomCardIdx: number = generateRandomNumber() % gameNumberOfCards;

        if (!tempGrid[randomPositionGrid]) {
            tempGrid[randomPositionGrid] = CARDS[gameTypeOfCards][randomCardIdx];
            numSelectedCards++;
        }
    }

    const gameSeed: Seed = {
        type: gameTypeOfCards,
        difficulty: gameDifficulty,
        numberOfCards: gameNumberOfCards,
        maxNumberOfMoves: gameMaxNumberOfMoves.value,
        maxTime: gameMaxTime.value,
        hasOvertime: gameHasOvertime,
        startGrid: tempGrid
    }

    const gameStartState: GameState = {
        state: 'playing',
        seed: gameSeed,
        currentGrid: tempGrid,
        guesses: [],
        correctGuesses: [],
    }

    return {
        gameStartState
    }
}