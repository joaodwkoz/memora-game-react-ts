import { useCallback, useState, useEffect } from "react";
import type { Card, GameState } from "../types";
import { processTurn, isValidMove } from "../core/engine";
import { useDailySeed } from "./useDailySeed";

export function useGame(date?: Date | null) {
    const {
        gameStartState
    } = useDailySeed(date);

    const [gameState, setGameState] = useState<GameState>(gameStartState);

    useEffect(() => {
        if (gameState.state !== 'guessing') {
            return;
        }

        const id = setTimeout(() => {
            setGameState(prev => processTurn(prev));
        }, 1000);

        return () => clearTimeout(id);
    }, [gameState.state]);

    useEffect(() => {
        if (gameState.state !== 'lost' || !gameState.currentMatch.card1) {
            return;
        }

        const id = setTimeout(() => {
            setGameState(prev => {
                return {
                    ...processTurn(prev),
                    state: 'lost',
                }
            });
        }, 1000);

        return () => clearTimeout(id);
    }, [gameState.currentMatch, gameState.state]);

    const handleCardClick = (card: Card): void => {
        if (!isValidMove(gameState)) {
            return;
        }

        if (card.state === 'shown') {
            return;
        }

        const nextState = {...gameState};

        nextState.currentGrid = nextState.currentGrid.map((c) => {
            if (c.id === card.id) {
                return { 
                    ...c, 
                    state: 'shown'
                };
            }

            return c;
        });

        const updatedCard = nextState.currentGrid.find((c) => c.id === card.id)!;

        if (nextState.currentMatch.card1) {
            nextState.currentMatch.card2 = updatedCard;            
            nextState.state = 'guessing';
            setGameState(nextState);
        } else {
            nextState.currentMatch.card1 = updatedCard;
            setGameState(nextState);
        }
    }

    const handleGameOver = useCallback((): void => {
        setGameState(prev => {
            return {
                ...prev,
                isInOvertime: false,
                state: 'lost',
            }
        });
    }, []);

    const handleOvertimeStart = useCallback((): void => {
        setGameState(prev => {
            return {
                ...prev,
                isInOvertime: true,
            }
        });

        console.log('game em overtime');
    }, []);

    return {
        gameState,
        handleCardClick,
        handleGameOver,
        handleOvertimeStart,
    }
}