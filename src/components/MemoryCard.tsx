import { useState } from "react";
import { motion } from "motion/react";
import type { Card } from "../types";
import { DogIcon } from "./icons/animals";
import { KnifeIcon } from "./icons/objects";
import { AppleIcon } from "./icons/fruits";

interface MemoryCardProps extends Card {
  onClick?: () => void,
}

const MixedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        width="640" 
        height="640" 
        viewBox="0 0 640 640"
    >
        <path fill="currentColor" d="M467.8 98.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S448 268.9 448 256v-32h-32c-10.1 0-19.6 4.7-25.6 12.8L358 280l-40-53.3l21.2-28.3c18.1-24.2 46.6-38.4 76.8-38.4h32v-32c0-12.9 7.8-24.6 19.8-29.6M218 360l40 53.3l-21.2 28.3C218.7 465.8 190.2 480 160 480H96c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c10.1 0 19.6-4.7 25.6-12.8zm284.6 174.6c-9.2 9.2-22.9 11.9-34.9 6.9S448 524.9 448 512v-32h-32c-30.2 0-58.7-14.2-76.8-38.4L185.6 236.8c-6-8.1-15.5-12.8-25.6-12.8H96c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c30.2 0 58.7 14.2 76.8 38.4l153.6 204.8c6 8.1 15.5 12.8 25.6 12.8h32v-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/>
    </svg>
);

const typesFaceSvg = {
    animals: DogIcon,
    objects: KnifeIcon,
    fruits: AppleIcon,
    mixed: MixedIcon,
} as const;

export const MemoryCard = (
    (
        { 
            name, 
            svg,
            type,
            state, 
            onClick 
        }: MemoryCardProps
    ) => {
        const [isHovered, setIsHovered] = useState<boolean>(false);

        const isShown = state === "shown";

        const Icon = svg;

        const FaceIcon = typesFaceSvg[type];

        return (
            <div className="w-24 h-32 perspective-1000" onClick={onClick}>
                <motion.div
                    animate={{
                        rotateY: isShown ? 180 : 0,
                        transition: { duration: 0.375 }
                    }}
                    className="cursor-pointer relative w-full h-full rounded-2xl transform-style-preserve-3d"
                    onMouseEnter={
                        () => setIsHovered(true)
                    }
                    onMouseLeave={
                        () => setIsHovered(false)
                    }
                >
                    <motion.div 
                        animate={{
                            y: isHovered ? -6 : 0,
                            borderColor: isHovered ? '#77A4E8' : '#6886B2',
                            transition: { duration: 0.1 }
                        }}
                        className="absolute inset-0 rounded-2xl color-card border-3 flex items-center justify-center backface-hidden p-3"
                    >
                        <motion.div 
                            animate={{
                                borderColor: isHovered ? '#77A4E8' : '#6886B2',
                                transition: { duration: 0.1 }
                            }}
                            className="w-full h-full rounded-lg border-3 flex items-center justify-center"
                        >
                            <motion.div
                                animate={{
                                    color: isHovered ? '#77A4E8' : '#B8D4FF',
                                    transition: { duration: 0.1 }
                                }}
                                className="w-10 h-10"
                            >
                                <FaceIcon
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full" 
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <div className="absolute inset-0 rounded-2xl color-card border-3 border-border flex items-center justify-center rotate-y-180 backface-hidden p-3">
                        <div className="h-full w-full">
                            <div className="aspect-square w-full rounded-md bg-primary flex items-center p-4">
                                {
                                    Icon && (
                                        <Icon className="w-full h-full text-white" />
                                    )
                                }
                            </div>

                            <div className="h-10 flex items-center justify-center">
                                <p className="font-medium text-xs leading-snug text-white truncate">
                                    { name }
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
);