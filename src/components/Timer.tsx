import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface TimerProps {
    startTime?: number | null,
    endTime: number,
    showBar?: boolean | null,
    hasOvertime?: boolean | null,
    isRunning?: boolean | null,
    onTimeEnd?: () => void,
    onOvertimeStart?: () => void,
}

export function Timer({ startTime = 0, endTime, showBar = true, hasOvertime, isRunning = true, onTimeEnd, onOvertimeStart }: TimerProps) {
    const [seconds, setSeconds] = useState<number>(startTime!);
    const [gameInOvertime, setGameInOvertime] = useState<boolean>(false);
    const hasFinishedRef = useRef(false);

    useEffect(() => {
        if (!isRunning || hasFinishedRef.current) {
            return;
        };

        const runningFunction = setTimeout(() => {
            setSeconds(prev => prev + (gameInOvertime ? 2 : 1));
        }, 1000);

        return () => clearTimeout(runningFunction);
    }, [isRunning, seconds, endTime, gameInOvertime]);

    useEffect(() => {
        if (seconds >= endTime && !hasFinishedRef.current) {
            hasFinishedRef.current = true;
            setGameInOvertime(false);
            onTimeEnd!();
        } else if (seconds < endTime) {
            hasFinishedRef.current = false;

            if (isRunning && hasOvertime) {
                const timePercentage = Math.floor(seconds / endTime * 100);

                if (timePercentage > 33 && !gameInOvertime) {
                    setGameInOvertime(true);
                    onOvertimeStart!();
                }
            } else {
                setGameInOvertime(false);
            }
        }
    }, [hasOvertime, isRunning, seconds, endTime, gameInOvertime]);

    const pulseAnimation = {
        scale: [1, 1.1, 1],
        transition: { 
            duration: 0.9, 
            repeat: Infinity, 
            repeatType: "reverse" as const 
        }
    };

    return (
        <div className="flex gap-3 items-center">
            <div className="relative h-8 flex overflow-hidden justify-center w-8">
                <motion.div
                    animate={{ 
                        y: gameInOvertime ? -32 : 0,
                    }}
                    transition={{ 
                        y: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                    className="w-full text-center flex flex-col items-center"
                >
                    <svg className="h-8 w-8 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M12 6a1 1 0 0 0-.993.883L11 7v5l.009.131a1 1 0 0 0 .197.477l.087.1l3 3l.094.082a1 1 0 0 0 1.226 0l.094-.083l.083-.094a1 1 0 0 0 0-1.226l-.083-.094L13 11.585V7l-.007-.117A1 1 0 0 0 12 6"/></svg>

                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 shrink-0" 
                        width="24" height="24" 
                        viewBox="0 0 126 150" 
                        fill="none" 
                    >
                        <path d="M89.7898 1.57518C91.117 0.579052 92.7242 0.0281564 94.3823 0.00105049C96.0404 -0.0260554 97.6647 0.472011 99.0236 1.42423C100.383 2.37645 101.407 3.73421 101.95 5.3039C102.493 6.87359 102.528 8.57507 102.049 10.1657C100.673 14.7662 100.518 19.6468 101.601 24.3256C102.679 28.9766 104.96 33.2615 108.215 36.7499C108.431 36.9845 108.634 37.2322 108.821 37.4914C113.514 43.9363 140.001 81.6669 116.23 122.387L115.994 122.774C110.22 131.474 102.311 138.542 93.026 143.3C83.8531 148.005 73.6228 150.258 63.3259 149.839C52.3771 150.031 41.5649 147.381 31.9408 142.148C22.1493 136.813 13.903 129.03 8.00434 119.555C-2.23952 102.201 -1.31828 83.6154 3.37452 68.7456C7.96497 54.1677 16.6026 41.8143 23.9016 36.387C25.0484 35.5363 26.4044 35.0138 27.8247 34.8753C29.2449 34.7368 30.676 34.9877 31.965 35.6009C33.254 36.2142 34.3524 37.1669 35.1428 38.3572C35.9332 39.5475 36.3859 40.9306 36.4525 42.3586C36.98 53.647 39.3107 62.4821 42.7043 69.424C44.4523 50.4364 51.5781 36.3239 60.2157 25.848C69.247 14.883 80.4042 7.70453 86.3805 3.85495C87.5358 3.13318 88.6701 2.3782 89.7819 1.59096L89.7898 1.57518Z" fill="#F35252"/>
                        <path d="M81.9703 122.183C88.8207 117.03 93.212 109.114 93.212 100.238C93.212 84.7221 79.7923 72.1339 63.2343 72.1339C46.6763 72.1339 33.2566 84.7221 33.2566 100.238C33.2566 109.114 37.6479 117.03 44.4982 122.183V126.468C44.4982 129.572 47.0159 132.089 50.119 132.089H53.8663V127.405C53.8663 125.848 55.1192 124.595 56.6767 124.595C58.2341 124.595 59.4871 125.848 59.4871 127.405V132.089H66.9815V127.405C66.9815 125.848 68.2345 124.595 69.7919 124.595C71.3493 124.595 72.6023 125.848 72.6023 127.405V132.089H76.3495C79.4527 132.089 81.9703 129.572 81.9703 126.468V122.183ZM44.4982 102.112C44.4982 97.9779 47.859 94.6171 51.9927 94.6171C56.1263 94.6171 59.4871 97.9779 59.4871 102.112C59.4871 106.245 56.1263 109.606 51.9927 109.606C47.859 109.606 44.4982 106.245 44.4982 102.112ZM74.4759 94.6171C78.6096 94.6171 81.9703 97.9779 81.9703 102.112C81.9703 106.245 78.6096 109.606 74.4759 109.606C70.3423 109.606 66.9815 106.245 66.9815 102.112C66.9815 97.9779 70.3423 94.6171 74.4759 94.6171Z" fill="white"/>
                    </svg>
                </motion.div>
            </div>

            <motion.p
                animate={{
                    color: gameInOvertime ? '#ff6467' : '#fff',
                    ...(gameInOvertime ? pulseAnimation : { scale: 1 })
                }}
                transition={{ duration: 0.2 }}
                className="w-16 text-left font-semibold text-2xl tracking-tight"
            >
                {Math.floor(seconds / 60).toString().padStart(2, '0')}:{(seconds % 60).toString().padStart(2, '0')}
            </motion.p>

            {showBar && (
                <motion.div
                    animate={{
                        backgroundColor: gameInOvertime ? '#ffa2a2' : '#e5e7eb',
                        boxShadow: gameInOvertime ? "0px 0px 12px #ff6467" : "0px 0px 0px transparent",
                    }}
                    transition={{ 
                        backgroundColor: { duration: 0.2 },
                        boxShadow: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
                    }}
                    className="w-30 h-8 rounded-sm relative overflow-hidden"
                >
                    <motion.div 
                        animate={{
                            width: `${Math.floor((1 - seconds / endTime) * 100)}%`,
                            backgroundColor: gameInOvertime ? '#ff6467' : '#fff',
                        }}
                        transition={{ 
                            width: { duration: 0.3 },
                            backgroundColor: { duration: 0.2 }
                        }}
                        className="absolute inset-0 h-full rounded-l-sm"
                    />
                </motion.div>
            )}
        </div>
    )
}