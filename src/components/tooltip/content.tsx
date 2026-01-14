import type { ReactNode } from "react";
import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTooltip } from "./context";

interface TooltipContentProps {
    children: ReactNode,
}

export function TooltipContent({ children }: TooltipContentProps) {
    const { isOpen, triggerRef } = useTooltip();
    const [coords, setCoords] = useState({ 
        top: 0,
        left: 0 
    });

    useLayoutEffect(() => {
        if (isOpen && triggerRef?.current) {
            const rect = triggerRef.current.getBoundingClientRect();

            setCoords({
                left: rect.left + rect.width / 2,
                top: rect.top + window.scrollY - 10 
            });
        }
    }, [isOpen, triggerRef]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        y: 10 
                    }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0 
                    }}
                    exit={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        y: 10 
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20 
                    }}
                    style={{ 
                        top: coords.top, 
                        left: coords.left 
                    }}
                    className="fixed -translate-x-1/2 -translate-y-full px-3 py-1 bg-surface-interactive text-white text-sm rounded border border-white/5 max-w-96 z-9999"
                >
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-interactive border-b border-r border-white/5 rotate-45" />

                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}