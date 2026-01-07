import { useState } from "react";
import type { Card, GameState } from "../types";
import { useDailySeed } from "./useDailySeed";
import { processTurn, isValidMove } from "../core/engine";

export function useGame(date?: Date | null) {
    const {
        gameStartState
    } = useDailySeed(date);

    const [gameState, setGameState] = useState<GameState>(gameStartState);

    const handleCardClick = (card: Card): void => {
        if (!isValidMove(gameState)) {
            return;
        }

        const isInACorrectGuess = gameState.correctGuesses.find(
            (guess) => (guess.match.card1!.id === card.id || guess.match.card2!.id === card.id)
        );

        if (isInACorrectGuess) {
            return;
        }

        const nextState = {...gameState};

        nextState.currentGrid = nextState.currentGrid.map((c) => {
            if (c.id === card.id) {
                return { 
                    ...c, 
                    state: c.state === 'shown' ? 'hidden' : 'shown' 
                };
            }

            return c;
        });

        const updatedCard = nextState.currentGrid.find((c) => c.id === card.id)!;

        const isNowShowing = updatedCard.state === 'shown';

        if (isNowShowing) {
            if (nextState.currentMatch.card1) {
                nextState.currentMatch.card2 = updatedCard;
                
                nextState.state = 'guessing';

                setGameState(nextState);

                const guessingState = {...nextState};

                setTimeout(() => {
                    const processedState = processTurn(guessingState);
                    setGameState(processedState);
                }, 1000);
            } else {
                nextState.currentMatch.card1 = updatedCard;
                setGameState(nextState);
            }
        } else {
            nextState.currentMatch = {
                card1: null,
                card2: null,
            };

            setGameState(nextState);
        }
    }

    return {
        gameState,
        handleCardClick
    }
}