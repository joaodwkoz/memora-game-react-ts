import type { GameState, Seed, Card } from "../types";
import { prng } from "../core/prng";
import { generateSeed } from "../core/daily-seed";
import { createGrid } from "../core/create-grid";
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

    const gameIndividualCards: Set<Card> = new Set<Card>();

    while(gameIndividualCards.size < gameNumberOfCards / 2) {
        let gameType = gameTypeOfCards;

        if (gameTypeOfCards === "mixed") {
            const randomTypeOfCard = generateRandomNumber(TYPE_OF_CARDS.length - 1);
            gameType = TYPE_OF_CARDS[randomTypeOfCard];   
        }

        const gameCards = CARDS[gameType];
        let randomGeneratedCardIdx = generateRandomNumber(gameCards.length);

        while(gameIndividualCards.has(gameCards[randomGeneratedCardIdx])) {
            randomGeneratedCardIdx = generateRandomNumber(CARDS[gameType].length);
        }

        gameIndividualCards.add(gameCards[randomGeneratedCardIdx]);
    }

    const gameCards = createGrid(gameIndividualCards, gameTypeOfCards);

    const generatedMaxNumberOfMoves = MAX_NUMBER_OF_MOVES[gameNumberOfCards];
    const randomMaxNumberOfMoves = generateRandomNumber(generatedMaxNumberOfMoves.length);
    const gameMaxNumberOfMoves = generatedMaxNumberOfMoves[randomMaxNumberOfMoves];

    const generatedMaxTimeSeconds = MAX_TIME_SECONDS[gameNumberOfCards];
    const randomMaxTime = generateRandomNumber(generatedMaxTimeSeconds.length);
    const gameMaxTime = generatedMaxTimeSeconds[randomMaxTime];

    const randomHasOvertime = generateRandomNumber(20);
    const gameHasOvertime = randomHasOvertime > 17;

    const difficultyPoints = gameMaxNumberOfMoves.score + gameMaxTime.score + (gameHasOvertime ? 5: 0);

    const gameDifficulty = DIFFICULTY_BY_SCORE(difficultyPoints);

    const tempGrid: Card[] = [];

    for (const card of gameCards) {
        let randomGeneratedIdx = generateRandomNumber(gameNumberOfCards);

        while (tempGrid[randomGeneratedIdx]) {
            randomGeneratedIdx = generateRandomNumber(gameNumberOfCards);
        }

        tempGrid[randomGeneratedIdx] = card;
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
        currentMatch: {
            card1: null,
            card2: null,
        }
    }

    return {
        gameStartState
    }
}