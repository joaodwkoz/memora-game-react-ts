export function prng(seed: number) : Function { // Função do Gerador de Números Pseudoaleatórios (PRNG) usando método de Congruência Linear (LCG)
    const A: number = 31;
    const B: number = 23;
    const M: number = 1000000007;

    seed = ((seed * A) + B) % M;

    return function next(): number {
        seed = ((seed * A) + B) % M;
        return seed;
    }
}