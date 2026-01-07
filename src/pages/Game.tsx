import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useGame } from "../hooks/useGame";
import { Button } from "../components/Button";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { Timer } from "../components/Timer";
import { GameStat } from "../components/GameStat";
import { MemoryCard } from "../components/MemoryCard";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon, ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const MotionButton = motion.create(Button);

export function Game() {
    const navigate = useNavigate();

    const goToOtherPage = (page: string) => {
        navigate(`/${page}`);
    }

    const { gameState, handleCardClick } = useGame();

    const handleWin = (): void => {
        console.log('parabéns você ganhou, fez o mínimo');
    }

    const handleLose = (): void => {
        console.log('parabéns você perdeu, fez o máximo e mesmo assim perdeu');
    }

    return (
        <div className="w-screen h-screen bg-background">
            <div className="w-full h-full flex justify-center p-6">
                <div className="w-[180] h-full flex flex-col gap-8">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-8">
                            <MotionButton
                                whileHover={{
                                    opacity: 1,
                                    transition: { duration: 0.1 }
                                }}
                                size='custom' 
                                className='h-16 w-16 rounded-lg flex items-center justify-center opacity-70' 
                                variant='interactive'
                                onClick={
                                    () => goToOtherPage('')
                                }
                            >
                                <ChevronLeftIcon strokeWidth={3} className="h-8 text-primary" />
                            </MotionButton>

                            <MotionButton 
                                whileHover={{
                                    opacity: 1,
                                    transition: { duration: 0.1 }
                                }}
                                size='custom' 
                                className='h-16 w-16 rounded-lg flex items-center justify-center opacity-70' 
                                variant='interactive'
                            >
                                <BookOpenIcon strokeWidth={3} className="h-8 text-primary" />
                            </MotionButton>
                        </div>

                        <p className="font-semibold text-5xl tracking-tight text-primary leading-none">
                            Memora
                        </p>

                        <div className="flex gap-8">
                            <MotionButton 
                                whileHover={{
                                    opacity: 1,
                                    transition: { duration: 0.1 }
                                }}
                                size='custom' 
                                className='h-16 w-16 rounded-lg flex items-center justify-center opacity-70' 
                                variant='interactive'
                            >
                                <ChartBarIcon strokeWidth={3} className="h-8 text-primary" />
                            </MotionButton>

                            <MotionButton 
                                whileHover={{
                                    opacity: 1,
                                    transition: { duration: 0.1 }
                                }}
                                size='custom' 
                                className='h-16 w-16 rounded-lg flex items-center justify-center opacity-70' 
                                variant='interactive'
                            >
                                <Cog6ToothIcon strokeWidth={3} className="h-8 text-primary" />
                            </MotionButton>
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col gap-4">
                            <DifficultyBadge 
                                difficulty={gameState.seed.difficulty} 
                            />

                            <GameStat 
                                icon={
                                    <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm.01 16H17a1 1 0 0 0-.117 1.993l.127.007a1 1 0 0 0 0-2m-4.98-9.5l-.115.005c-.384.04-.724.273-.898.623l-.51 1.027l-1.138.166c-.423.059-.78.357-.914.768l-.033.125a1.13 1.13 0 0 0 .322 1.039l.82.797l-.194 1.127c-.07.432.107.857.454 1.108l.107.068a1.13 1.13 0 0 0 1.078.018l1.022-.536l1.019.535c.377.2.84.168 1.19-.086l.1-.08c.281-.259.416-.645.35-1.028l-.194-1.126l.823-.799c.31-.302.42-.752.287-1.161l-.042-.11a1.13 1.13 0 0 0-.873-.659l-1.138-.166l-.508-1.026a1.13 1.13 0 0 0-1.014-.63M7.01 4H7a1 1 0 0 0-.117 1.993L7.01 6a1 1 0 1 0 0-2"/></svg>
                                } 
                                value={gameState.correctGuesses.length} 
                                maxValue={gameState.seed.numberOfCards / 2}
                                onReachMaxValue={handleWin}             
                            />

                            <GameStat 
                                icon={
                                    <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -3 24 24"><path fill="currentColor" d="m11.774 15l1.176 1.176a1 1 0 0 1-1.414 1.414l-2.829-2.828a1 1 0 0 1 0-1.414l2.829-2.829a1 1 0 0 1 1.414 1.415L11.883 13H14a4 4 0 1 0 0-8a1 1 0 0 1 0-2a6 6 0 1 1 0 12zM8.273 3L7.176 1.904A1 1 0 0 1 8.591.489l2.828 2.829a1 1 0 0 1 0 1.414L8.591 7.56a1 1 0 0 1-1.415-1.414L8.323 5H6a4 4 0 1 0 0 8a1 1 0 0 1 0 2A6 6 0 1 1 6 3z"/></svg>
                                } 
                                value={gameState.guesses.length} 
                                maxValue={gameState.seed.maxNumberOfMoves}
                                onReachMaxValue={handleLose}
                            />

                            <Timer 
                                startTime={0} 
                                endTime={90} 
                                isRunning={gameState.correctGuesses.length !== gameState.currentGrid.length / 2}
                                onTimeEnd={handleLose} 
                            />
                        </div>
                    </div>

                    <div>
                        <div className="w-full grid auto-rows-auto grid-cols-6 gap-6">
                            {
                                gameState.currentGrid.map(
                                    (card, i) => (
                                        <MemoryCard 
                                            key={i.toString()} 
                                            onClick={
                                                () => handleCardClick(card)
                                            } 
                                            {...card} 
                                        />
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}