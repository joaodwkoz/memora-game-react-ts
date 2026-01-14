import { motion } from "motion/react";
import type { ReactNode } from "react";

interface GameAlertProps {
    id: number | string,
    type?: 'effect' | 'activity' | null,
    children: ReactNode,
}

export function GameAlert({ id, type = 'effect', children }: GameAlertProps) {
    return (
        <motion.div 
            key={id}
            initial={{ 
                y: 50, 
                scale: 0.9, 
                opacity: 0 
            }}
            animate={{ 
                y: 0, 
                opacity: 1,
                ...(type === 'effect' ? {
                    scale: [1, 1.05, 1]
                } : {})
            }}
            exit={{ 
                y: 20, 
                opacity: 0, 
                scale: 0.95,
                transition: { 
                    duration: 0.5, 
                    ease: "anticipate" 
                } 
            }} 
            transition={{
                y: { 
                    type: "spring", 
                    stiffness: 150,
                    damping: 18,
                    mass: 1.2 
                },
                opacity: { duration: 0.8 },
                scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror"
                }
            }}
            className="h-full bg-surface-interactive flex gap-1 p-1.5 items-center justify-center rounded-lg shadow-lg origin-center z-9999"
        >
            { children }
        </motion.div>
    )
}