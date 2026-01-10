import { useEffect } from "react";
import { motion } from "motion/react";

interface GameStatProps {
    icon?: React.ReactNode | null,
    value?: number | null,
    maxValue?: number | null,
    onReachMaxValue?: () => void 
}

export function GameStat({ icon, value = 0, maxValue, onReachMaxValue }: GameStatProps) {
    useEffect(() => {
        if (value! === maxValue) {
            onReachMaxValue!();
        }
    }, [value]);

    return (
        <div className="flex h-6 gap-3 items-center">
            {icon}

            <div className="relative h-6 overflow-hidden flex justify-center">
                <p className="font-semibold text-2xl tracking-tight text-white leading-none opacity-0 invisible">
                    {value}
                </p>

                <motion.div
                    animate={{ y: value! * -24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 w-full text-center"
                >
                    {Array.from({ length: maxValue! !== -1 ? maxValue! + 2 : 300 }).map(
                        (_, i) => (
                            <div key={i} className="h-6 flex items-center justify-center">
                                <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                                    {i}
                                </p>
                            </div>
                        )
                    )}
                </motion.div>
                
            </div>

            <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                /
            </p>

            {maxValue !== -1 ? (
                <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                    {maxValue}
                </p>
            ) : (
                <svg 
                    className="text-white h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="512" 
                    height="512" 
                    viewBox="0 0 512 512"
                >
                    <path fill="currentColor" d="M382 136c-40.87 0-73.46 20.53-93.6 37.76l-.71.61l-11.47 12.47l25.32 41.61l18.74-18.79C339.89 193.1 361.78 184 382 184c40.8 0 74 32.3 74 72s-33.2 72-74 72c-62 0-104.14-81.95-104.56-82.78C275 240.29 221.56 136 130 136C62.73 136 8 189.83 8 256s54.73 120 122 120c32.95 0 65.38-13.11 93.79-37.92l.61-.54l11.38-12.38l-25.33-41.61l-18.83 18.88C172 319.4 151.26 328 130 328c-40.8 0-74-32.3-74-72s33.2-72 74-72c62 0 104.14 81.95 104.56 82.78C237 271.71 290.44 376 382 376c67.27 0 122-53.83 122-120s-54.73-120-122-120"/>
                </svg>
            )}
        </div>
    )
}