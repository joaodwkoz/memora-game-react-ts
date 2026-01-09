import type { Card, CardType } from "../types";

export function createGrid(cards: Set<Card>, typeOfCards: CardType): Card[] {
    const grid: Card[] = [];

    let i: number = 1;
    cards.forEach((c) => {
        const pairId = i + 1;

        const first: Card = { 
            ...c, 
            id: `${pairId}-a`,
            type: typeOfCards
        };

        const second: Card = { 
            ...c,
            id: `${pairId}-b`,
            type: typeOfCards
        };

        grid.push(first, second);
        i++;
    });

    return grid;
}