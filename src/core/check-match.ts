import type { Card } from "../types";

export function checkMatch(card1: Card, card2: Card): boolean {
    return card1.name === card2.name;
}   