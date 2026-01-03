import type { Card } from './../types/index';

const ANIMALS = [
    "Cachorro",
    "Gato",
    "Leão",
    "Tigre",
    "Elefante",
    "Girafa",
    "Zebra",
    "Cavalo",
    "Vaca",
    "Porco",
    "Macaco",
    "Urso",
    "Lobo",
    "Raposa",
    "Coelho",
    "Rato",
    "Golfinho",
    "Baleia",
    "Tubarão",
    "Peixe",
    "Águia",
    "Galinha",
    "Pato",
    "Papagaio",
    "Coruja",
    "Falcão",
    "Pinguim",
    "Flamingo",
    "Beija-flor",
    "Canário"
];

const FRUITS = [
    "Maçã",
    "Banana",
    "Laranja",
    "Uva",
    "Manga",
    "Abacaxi",
    "Morango",
    "Melancia",
    "Melão",
    "Pera",
    "Limão",
    "Acerola",
    "Cereja",
    "Pêssego",
    "Ameixa",
    "Kiwi",
    "Mamão",
    "Goiaba",
    "Maracujá",
    "Figo",
    "Caqui",
    "Romã",
    "Jabuticaba",
    "Graviola",
    "Pitaya",
    "Carambola",
    "Coco",
    "Tangerina",
    "Framboesa",
    "Amora"
];

const OBJECTS = [
    "Faca",
    "Garfo",
    "Colher",
    "Prato",
    "Copo",
    "Panela",
    "Mesa",
    "Cadeira",
    "Sofá",
    "Cama",
    "Travesseiro",
    "Cobertor",
    "Livro",
    "Caderno",
    "Caneta",
    "Lápis",
    "Borracha",
    "Mochila",
    "Celular",
    "Computador",
    "Teclado",
    "Mouse",
    "Monitor",
    "Televisão",
    "Controle remoto",
    "Relógio",
    "Óculos",
    "Sapato",
    "Camisa",
    "Chave"
];

const MIXED = [
    ...ANIMALS.slice(0, 10),
    ...FRUITS.slice(0, 10),
    ...OBJECTS.slice(0, 10),
];

export const CARDS: Record<string, Card[]> = {
    'animals': 
        ANIMALS.map(
            (anim) => {
                return { 
                    type: 'animals',
                    name: anim,
                    imageUrl: '',
                    state: 'hidden',
                }
            } 
        ),
    'fruits': 
        FRUITS.map(
            (fru) => {
                return { 
                    type: 'fruits',
                    name: fru,
                    imageUrl: '',
                    state: 'hidden',
                }
            } 
        ),
    'objects':
        OBJECTS.map(
            (obj) => {
                return { 
                    type: 'objects',
                    name: obj,
                    imageUrl: '',
                    state: 'hidden',
                }
            } 
        ),
    'mixed': 
        MIXED.map(
            (mix) => {
                return { 
                    type: 'mixed',
                    name: mix,
                    imageUrl: '',
                    state: 'hidden',
                }
            } 
        ),
}