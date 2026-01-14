import { useContext, createContext, type RefObject } from "react";

interface TooltipContextType {
    isOpen: boolean,
    show: () => void,
    hide: () => void,
    triggerRef: RefObject<HTMLDivElement | null> | null,
}

export const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltip = () => {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error("useTooltip precisa ser definido dentro de um Tooltip.root");
    }

    return context;
}