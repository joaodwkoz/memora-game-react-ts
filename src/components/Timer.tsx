import { useEffect, useState } from "react";

interface TimerProps {
    startTime?: number | null,
    endTime: number,
    showBar?: boolean | null,
    hasOvertime?: boolean | null,
    isRunning?: boolean | null,
    onTimeEnd?: () => void,
}

export function Timer({ startTime = 0, endTime, showBar = true, hasOvertime = false, isRunning = true, onTimeEnd }: TimerProps) {
    const [seconds, setSeconds] = useState<number>(startTime!);

    useEffect(() => {
        if (!isRunning) return;

        const runningFunction = setTimeout(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearTimeout(runningFunction);
    }, [isRunning, seconds]);

    useEffect(() => {
        if (seconds === endTime) {
            onTimeEnd!();
        }
    }, [seconds]);

    return (
        <div className="flex gap-3 items-center">
            <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M12 6a1 1 0 0 0-.993.883L11 7v5l.009.131a1 1 0 0 0 .197.477l.087.1l3 3l.094.082a1 1 0 0 0 1.226 0l.094-.083l.083-.094a1 1 0 0 0 0-1.226l-.083-.094L13 11.585V7l-.007-.117A1 1 0 0 0 12 6"/></svg>

            <p className="w-16 text-left font-semibold text-2xl tracking-tight text-white">
                { Math.floor(seconds / 60).toString().padStart(2, '0') }:{ (seconds % 60).toString().padStart(2, '0') }
            </p>

            {showBar && (
                <div className="w-30 h-8 bg-gray-200 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 h-full bg-white rounded-l-sm" style={{
                        width: `${Math.floor((1 - seconds / endTime) * 100)}%`
                    }}>

                    </div>
                </div>
            )}
        </div>
    )
}