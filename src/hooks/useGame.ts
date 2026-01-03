import { useState } from "react";
import type { GameState, Match } from "../types";
import { useDailySeed } from "./useDailySeed";
import { processTurn, isValidMove } from "../core/engine";

export function useGame(date?: Date | null) {
    const {
        gameStartState
    } = useDailySeed(date);

    const [gameState, setGameState] = useState<GameState>(gameStartState);

    const handleMatch = (match: Match): void => {
        if (!isValidMove(gameState, match)) {
            return;
        }

        const nextState = processTurn(gameState, match);

        setGameState(nextState)
    }

    return {
        gameState,
        handleMatch
    }
}