export function generateSeed(date?: Date | null): number { // Função para gerar seed a partir da data UTC.
    if (!date) {
        date = new Date();
    }

    let newDate = date?.toISOString();

    const formattedDate = newDate.split('-').join('');

    return parseInt(formattedDate);
}