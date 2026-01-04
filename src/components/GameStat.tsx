interface GameStatProps {
    icon?: React.ReactNode | null,
    startValue?: number | null,
    maxValue?: number | null,
    onReachMaxValue?: () => void 
}

export function GameStat({ icon, startValue = 0, maxValue, onReachMaxValue }: GameStatProps) {
    return (
        <div className="flex gap-3 items-center">
            {icon}

            <p className="font-semibold text-2xl tracking-tight text-white leading-none">
                {startValue}
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