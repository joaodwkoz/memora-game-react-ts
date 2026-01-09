import { useCallback, useState } from "react";
import type { Card, GameState } from "../types";
import { processTurn, isValidMove } from "../core/engine";
import { useDailySeed } from "./useDailySeed";

export function useGame(date?: Date | null) {
    const {
        gameStartState
    } = useDailySeed(date);

    const [gameState, setGameState] = useState<GameState>(gameStartState);

    const handleCardClick = (card: Card): void => {
        if (!isValidMove(gameState) || card.state === 'shown') {
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

            const guessingState = {...nextState};

            setTimeout(() => {
                const processedState = processTurn(guessingState);
                setGameState(processedState);
            }, 1000);
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