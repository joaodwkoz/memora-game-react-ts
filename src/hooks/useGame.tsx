import { useCallback, useState, useEffect, type ReactNode } from "react";
import type { Card, GameState } from "../types";
import { processTurn, isValidMove } from "../core/engine";
import { useDailySeed } from "./useDailySeed";

export function useGame(date?: Date | null) {
    const {
        gameStartState
    } = useDailySeed(date);

    const [gameState, setGameState] = useState<GameState>(gameStartState);

    const [activityAlerts, setActivityAlerts] = useState<{ id: string, type: 'activity', content: ReactNode }[]>([]);
    const removeAlert = useCallback((id: number | string) => {
        setActivityAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, [])

    useEffect(() => {
        if (gameState.state !== 'guessing') {
            return;
        }

        const id = setTimeout(() => {
            setGameState((prev) => {
                const processedTurn = processTurn(prev);

                const guessesDiff = processedTurn.guesses - prev.guesses;
                const correctGuessesDiff = processedTurn.correctGuesses - prev.correctGuesses;

                if (guessesDiff > 0) {
                    setActivityAlerts(prev => {
                        const newAlert = {
                            id: `guess-${Date.now()}`,
                            type: 'activity' as const,
                            content: (
                                <>
                                    <p className="font-semibold text-xl tracking-tight text-[#77A4E8] leading-none">+{guessesDiff}</p>

                                    <svg 
                                        className="w-6 h-6 text-[#77A4E8]" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="24" 
                                        height="24" 
                                        viewBox="-2 -3 24 24"
                                    >
                                        <path fill="currentColor" d="m11.774 15l1.176 1.176a1 1 0 0 1-1.414 1.414l-2.829-2.828a1 1 0 0 1 0-1.414l2.829-2.829a1 1 0 0 1 1.414 1.415L11.883 13H14a4 4 0 1 0 0-8a1 1 0 0 1 0-2a6 6 0 1 1 0 12zM8.273 3L7.176 1.904A1 1 0 0 1 8.591.489l2.828 2.829a1 1 0 0 1 0 1.414L8.591 7.56a1 1 0 0 1-1.415-1.414L8.323 5H6a4 4 0 1 0 0 8a1 1 0 0 1 0 2A6 6 0 1 1 6 3z"/>
                                    </svg>
                                </>
                            )
                        }

                        return [...prev, newAlert];
                    });
                }

                if (correctGuessesDiff > 0) {
                    setActivityAlerts(prev => {
                        const newAlert = {
                            id: `correct-guess-${Date.now()}`,
                            type: 'activity' as const,
                            content: (
                                <>
                                    <p className="font-semibold text-xl tracking-tight text-[#A0F59C] leading-none">+{correctGuessesDiff}</p>

                                    <svg
                                        className="w-6 h-6 text-[#A0F59C]" 
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="64" 
                                        height="64" 
                                        viewBox="0 0 64 64" 
                                    >
                                        <path d="M22.8898 10.9057C26.9441 3.63522 28.9697 0 32 0C35.0303 0 37.0559 3.63522 41.1102 10.9057L42.1598 12.7873C43.3117 14.8545 43.8877 15.8881 44.7837 16.5697C45.6797 17.2513 46.7997 17.5041 49.0396 18.0097L51.0747 18.4705C58.9466 20.2529 62.8793 21.1425 63.8169 24.1538C64.7512 27.1618 62.0697 30.301 56.7034 36.5762L55.3146 38.1986C53.7915 39.9811 53.0267 40.8739 52.6843 41.9747C52.3419 43.0787 52.4571 44.2691 52.6875 46.6467L52.8987 48.8131C53.7083 57.1876 54.1147 61.3732 51.6635 63.2324C49.2124 65.0916 45.5261 63.3956 38.1599 60.0036L36.2495 59.1268C34.1567 58.1604 33.1104 57.6804 32 57.6804C30.8896 57.6804 29.8432 58.1604 27.7505 59.1268L25.8433 60.0036C18.4739 63.3956 14.7876 65.0916 12.3397 63.2356C9.88532 61.3732 10.2917 57.1876 11.1013 48.8131L11.3125 46.6499C11.5429 44.2691 11.6581 43.0787 11.3125 41.9779C10.9733 40.8739 10.2085 39.9811 8.68535 38.2018L7.29658 36.5762C1.93031 30.3042 -0.75123 27.165 0.183148 24.1538C1.11753 21.1425 5.05663 20.2497 12.9284 18.4705L14.9636 18.0097C17.2003 17.5041 18.3171 17.2513 19.2163 16.5697C20.1155 15.8881 20.6883 14.8545 21.8402 12.7873L22.8898 10.9057Z" fill="currentColor"/>
                                    </svg>

                                </>
                            )
                        }

                        return [...prev, newAlert];
                    });
                }

                return {
                    ...processedTurn
                };
            });
        }, 1000);

        return () => clearTimeout(id);
    }, [gameState.state]);

    useEffect(() => {
        if (gameState.state !== 'lost' || !gameState.currentMatch.card1) {
            return;
        }

        const id = setTimeout(() => {
            setGameState(prev => {
                const processedTurn = processTurn(prev);

                const guessesDiff = processedTurn.guesses - prev.guesses;
                const correctGuessesDiff = processedTurn.correctGuesses - prev.correctGuesses;

                if (guessesDiff > 0) {
                    setActivityAlerts(prev => {
                        const newAlert = {
                            id: `guess-${Date.now()}`,
                            type: 'activity' as const,
                            content: (
                                <>
                                    <p className="font-semibold text-xl tracking-tight text-[#77A4E8] leading-none">+{guessesDiff}</p>

                                    <svg 
                                        className="w-6 h-6 text-[#77A4E8]" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="24" 
                                        height="24" 
                                        viewBox="-2 -3 24 24"
                                    >
                                        <path fill="currentColor" d="m11.774 15l1.176 1.176a1 1 0 0 1-1.414 1.414l-2.829-2.828a1 1 0 0 1 0-1.414l2.829-2.829a1 1 0 0 1 1.414 1.415L11.883 13H14a4 4 0 1 0 0-8a1 1 0 0 1 0-2a6 6 0 1 1 0 12zM8.273 3L7.176 1.904A1 1 0 0 1 8.591.489l2.828 2.829a1 1 0 0 1 0 1.414L8.591 7.56a1 1 0 0 1-1.415-1.414L8.323 5H6a4 4 0 1 0 0 8a1 1 0 0 1 0 2A6 6 0 1 1 6 3z"/>
                                    </svg>
                                </>
                            )
                        }

                        return [...prev, newAlert];
                    });
                }

                if (correctGuessesDiff > 0) {
                    setActivityAlerts(prev => {
                        const newAlert = {
                            id: `correct-guess-${Date.now()}`,
                            type: 'activity' as const,
                            content: (
                                <>
                                    <p className="font-semibold text-xl tracking-tight text-[#A0F59C] leading-none">+{correctGuessesDiff}</p>

                                    <svg
                                        className="w-6 h-6 text-[#A0F59C]" 
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="64" 
                                        height="64" 
                                        viewBox="0 0 64 64" 
                                    >
                                        <path d="M22.8898 10.9057C26.9441 3.63522 28.9697 0 32 0C35.0303 0 37.0559 3.63522 41.1102 10.9057L42.1598 12.7873C43.3117 14.8545 43.8877 15.8881 44.7837 16.5697C45.6797 17.2513 46.7997 17.5041 49.0396 18.0097L51.0747 18.4705C58.9466 20.2529 62.8793 21.1425 63.8169 24.1538C64.7512 27.1618 62.0697 30.301 56.7034 36.5762L55.3146 38.1986C53.7915 39.9811 53.0267 40.8739 52.6843 41.9747C52.3419 43.0787 52.4571 44.2691 52.6875 46.6467L52.8987 48.8131C53.7083 57.1876 54.1147 61.3732 51.6635 63.2324C49.2124 65.0916 45.5261 63.3956 38.1599 60.0036L36.2495 59.1268C34.1567 58.1604 33.1104 57.6804 32 57.6804C30.8896 57.6804 29.8432 58.1604 27.7505 59.1268L25.8433 60.0036C18.4739 63.3956 14.7876 65.0916 12.3397 63.2356C9.88532 61.3732 10.2917 57.1876 11.1013 48.8131L11.3125 46.6499C11.5429 44.2691 11.6581 43.0787 11.3125 41.9779C10.9733 40.8739 10.2085 39.9811 8.68535 38.2018L7.29658 36.5762C1.93031 30.3042 -0.75123 27.165 0.183148 24.1538C1.11753 21.1425 5.05663 20.2497 12.9284 18.4705L14.9636 18.0097C17.2003 17.5041 18.3171 17.2513 19.2163 16.5697C20.1155 15.8881 20.6883 14.8545 21.8402 12.7873L22.8898 10.9057Z" fill="currentColor"/>
                                    </svg>

                                </>
                            )
                        }

                        return [...prev, newAlert];
                    });
                }

                return {
                    ...processedTurn,
                    state: 'lost',
                };
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
        activityAlerts,
        removeAlert,
        handleCardClick,
        handleGameOver,
        handleOvertimeStart,
    }
}