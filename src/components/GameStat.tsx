import { useEffect } from "react"

interface GameStatProps {
    icon?: React.ReactNode | null,
    value?: number | null,
    maxValue?: number | null,
    onReachMaxValue?: () => void 
}

export function GameStat({ icon, value = 0, maxValue, onReachMaxValue }: GameStatProps) {
    useEffect(() => {
        if (value === maxValue) {
            onReachMaxValue!();
        }
    }, [value]);

    return (
        <div className="flex gap-3 items-center">
            {icon}

            <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                {value}
            </p>

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