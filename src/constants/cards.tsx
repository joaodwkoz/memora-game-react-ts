import type { ComponentType, SVGProps } from 'react';
import type { Card } from '../types/index';
import { BearIcon, CatIcon, ChickenIcon, DogIcon, FishIcon, FoxIcon, GiraffeIcon, HorseIcon, LionIcon, MonkeyIcon, ParrotIcon, PigIcon, RabbitIcon, SharkIcon, WolfIcon } from '../components/icons/animals';

type GameItem = {
    name: string;
    svg: ComponentType<SVGProps<SVGSVGElement>> | null;
};

const ANIMALS: GameItem[] = [
    { 
        name: "Cachorro",
        svg: DogIcon,
    },
    { 
        name: "Gato", 
        svg: CatIcon 
    },
    { 
        name: "Leão",
        svg: LionIcon
    },
    { 
        name: "Cavalo", 
        svg: HorseIcon
    },
    { 
        name: "Girafa", 
        svg: GiraffeIcon
    },
    { 
        name: "Porco", 
        svg: PigIcon
    },
    { 
        name: "Macaco", 
        svg: MonkeyIcon
    },
    { 
        name: "Urso", 
        svg: BearIcon
    },
    { 
        name: "Lobo", 
        svg: WolfIcon
    },
    { 
        name: "Raposa", 
        svg: FoxIcon
    },
    { 
        name: "Coelho", 
        svg: RabbitIcon
    },
    { 
        name: "Tubarão", 
        svg: SharkIcon
    },
    { 
        name: "Peixe", 
        svg: FishIcon
    },
    { 
        name: "Galinha", 
        svg: ChickenIcon
    },
    { 
        name: "Papagaio", 
        svg: ParrotIcon
    },
];

const FRUITS: GameItem[] = [
    {
        name: "Maçã",
        svg: null,
    },
    {
        name: "Banana",
        svg: null,
    },
    {
        name: "Laranja",
        svg: null,
    },
    {
        name: "Uva",
        svg: null,
    },
    {
        name: "Manga",
        svg: null,
    },
    {
        name: "Abacaxi",
        svg: null,
    },
    {
        name: "Morango",
        svg: null,
    },
    {
        name: "Melancia",
        svg: null,
    },
    {
        name: "Melão",
        svg: null,
    },
    {
        name: "Pera",
        svg: null,
    },
    {
        name: "Limão",
        svg: null,
    },
    {
        name: "Acerola",
        svg: null,
    },
    {
        name: "Cereja",
        svg: null,
    },
    {
        name: "Pêssego",
        svg: null,
    },
    {
        name: "Ameixa",
        svg: null,
    },
];

const OBJECTS: GameItem[] = [
    {
        name: "Faca",
        svg: null,
    },
    {
        name: "Garfo",
        svg: null,
    },
    {
        name: "Colher",
        svg: null,
    },
    {
        name: "Prato",
        svg: null,
    },
    {
        name: "Copo",
        svg: null,
    },
    {
        name: "Panela",
        svg: null,
    },
    {
        name: "Mesa",
        svg: null,
    },
    {
        name: "Cadeira",
        svg: null,
    },
    {
        name: "Sofá",
        svg: null,
    },
    {
        name: "Cama",
        svg: null,
    },
    {
        name: "Travesseiro",
        svg: null,
    },
    {
        name: "Cobertor",
        svg: null,
    },
    {
        name: "Livro",
        svg: null,
    },
    {
        name: "Caderno",
        svg: null,
    },
    {
        name: "Caneta",
        svg: null,
    },
];

const MIXED = [
    ...ANIMALS.slice(0, 5),
    ...FRUITS.slice(0, 5),
    ...OBJECTS.slice(0, 5),
];

export const CARDS: Record<string, Card[]> = {
    'animals': 
        ANIMALS.map(
            (anim) => {
                return { 
                    id: 1,
                    type: 'animals',
                    name: anim.name,
                    svg: anim.svg,
                    state: 'hidden', 
                }
            } 
        ),
    'fruits': 
        FRUITS.map(
            (fru) => {
                return { 
                    id: 1,
                    type: 'fruits',
                    name: fru.name,
                    svg: fru.svg,
                    state: 'hidden',
                }
            } 
        ),
    'objects':
        OBJECTS.map(
            (obj) => {
                return { 
                    id: 1,
                    type: 'objects',
                    name: obj.name,
                    svg: obj.svg,
                    state: 'hidden',
                }
            } 
        ),
    'mixed': 
        MIXED.map(
            (mix) => {
                return { 
                    id: 1,
                    type: 'mixed',
                    name: mix.name,
                    svg: mix.svg,
                    state: 'hidden',
                }
            } 
        ),
}