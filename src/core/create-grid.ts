import type { Card } from "../types";

export function createGrid(cardArray: Card[]): Card[] {
    const grid: Card[] = [];

    cardArray.forEach((c, i) => {
        const pairId = i + 1;

        const first: Card = { 
            ...c, 
            id: `${pairId}-a` 
        };

        const second: Card = { 
            ...c,
            id: `${pairId}-b` 
        };

        grid.push(first, second);
    });

    return grid;
}