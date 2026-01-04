import type { Difficulty } from "../types"

interface DifficultyBadgeProps {
    difficulty: Difficulty,
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    return (
        <div className="w-36 h-9 flex items-center justify-center rounded-4xl" style={{ 
            backgroundColor: difficulty.color 
        }}>
            <p className="font-semibold text-base text-white leading-none">
                { difficulty.name }
            </p>
        </div>       
    )
}