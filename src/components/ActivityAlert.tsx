import { useEffect, type ReactNode } from "react";
import { GameAlert } from "./GameAlert";

interface ActivityAlertProps {
    id: string;
    content: ReactNode;
    onDismiss: (id: string) => void;
}

export function ActivityAlert({ id, content, onDismiss }: ActivityAlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 1000);

        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <GameAlert id={id} type="activity">
            {content}
        </GameAlert>
    );
}
