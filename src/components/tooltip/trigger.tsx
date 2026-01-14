import type { ReactNode } from "react";
import { useTooltip } from "./context";

interface TooltipTriggerProps {
    children: ReactNode,
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
    const { show, hide, triggerRef } = useTooltip();

    return (
        <div
            ref={triggerRef}
            onMouseEnter={show}
            onMouseLeave={hide}
            className="inline-block cursor-help"
        >
            { children }
        </div>
    )
}