export function generateSeed(date?: Date | null): number { // Função para gerar seed a partir da data UTC.
    let newDate = date?.toISOString();

    if (!date) {
        newDate = new Date().toISOString().substring(0, 10);
    }

    const formattedDate = newDate?.split('-').join('');

    return parseInt(formattedDate);
}

export function prng(seed: number) : Function { // Função do Geradorade Números Pseudoaleatórios (PRNG) usando método de Congruência Linear (LCG)
    const A: number = 31;
    const B: number = 23;
    const M: number = 1000000007;

    seed = ((seed * A) + B) % M;

    return function next(): number {
        seed = ((seed * A) + B) % M;
        return seed;
    }
}