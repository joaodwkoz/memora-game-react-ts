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
        <div className="flex gap-3 items-center">
            {icon}

            <div className="relative h-6 overflow-hidden flex justify-center">
                <p className="font-semibold text-2xl tracking-tight text-white leading-none opacity-0 invisible">
                    {value}
                </p>

                <motion.div
                    animate={{ y: (value || 0) * -24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 w-full text-center"
                >
                    {Array.from({ length: maxValue! + 1 }).map(
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

            {maxValue && (
                <>
                    <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                        /
                    </p>

                    <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                        {maxValue}
                    </p>
                </>
            )}
        </div>
    )
}