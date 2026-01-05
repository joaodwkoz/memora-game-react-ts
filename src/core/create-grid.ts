import type { Card } from "../types";

export function createGrid(cardArray: Card[]): Card[] {
    const firstPartArray = cardArray;
    const secondPartArray = cardArray.map((c, i) => {
        return {...c, id: 2};
    });

    return [...firstPartArray, ...secondPartArray];
}