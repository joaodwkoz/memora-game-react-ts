export function generateSeed(date?: Date | null): number { // Função para gerar seed a partir da data UTC.
    let newDate = date?.toISOString();

    if (!date) {
        newDate = new Date().toISOString().substring(0, 10);
    }

    const formattedDate = newDate?.split('-').join('');

    return parseInt(formattedDate);
}