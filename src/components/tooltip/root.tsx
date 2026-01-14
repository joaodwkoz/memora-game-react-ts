import { useState, useRef, type ReactNode } from 'react';
import { TooltipContext } from './context';

interface TooltipRootProps {
    children: ReactNode,
}

export function TooltipRoot({ children }: TooltipRootProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const triggerRef = useRef<HTMLDivElement>(null);
    
    const show = () => {
        setTimeout(() => {
            setIsOpen(true);
        }, 500);
    }

    const hide = () => setIsOpen(false);

    return (
        <TooltipContext.Provider value={{ isOpen, show, hide, triggerRef }}>
            <div className="relative inline-block">
                {children}
            </div>
        </TooltipContext.Provider>
    )
}