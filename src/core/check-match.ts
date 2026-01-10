import type { Card } from "../types";

export function checkMatch(card1: Card, card2: Card): boolean {
    if (!card1 ||!card2) {
        return false;
    }

    return card1.name === card2.name && card1.id !== card2.id;
}   