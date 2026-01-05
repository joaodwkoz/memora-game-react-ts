import { useState } from "react";
import type { Card, GameState, Match } from "../types";
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

        const nextState = {...gameState};

        nextState.currentGrid = nextState.currentGrid.map((c) => {
            if (c.id === card.id && c.name === card.name) {
                return {...c, state: 'shown'};
            }

            return c;
        });

        setGameState(nextState)
    }

    const handleMatch = (match: Match): void => {
        if (!isValidMove(gameState, match)) {
            return;
        }

        const nextState = processTurn(gameState, match);

        setGameState(nextState)
    }

    return {
        gameState,
        handleMatch,
        handleCardClick
    }
}