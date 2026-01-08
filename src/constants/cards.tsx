import type { ComponentType, SVGProps } from 'react';
import type { Card } from '../types/index';
import { BearIcon, CatIcon, ChickenIcon, DogIcon, FishIcon, FoxIcon, GiraffeIcon, HorseIcon, LionIcon, MonkeyIcon, ParrotIcon, PigIcon, RabbitIcon, SharkIcon, WolfIcon } from '../components/icons/animals';
import { AppleIcon, BananaIcon, CherryIcon, GrapeIcon, LimonIcon, MangoIcon, MelonIcon, OrangeIcon, PeachIcon, PearIcon, PineappleIcon, PlumIcon, RaspberryIcon, StrawberryIcon, WatermelonIcon } from '../components/icons/fruits';
import { BedIcon, BlanketIcon, BookIcon, ChairIcon, CouchIcon, CupIcon, ForkIcon, KnifeIcon, NotebookIcon, PenIcon, PillowIcon, PlateIcon, PotIcon, SpoonIcon, TableIcon } from '../components/icons/objects';

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
        svg: AppleIcon,
    },
    {
        name: "Banana",
        svg: BananaIcon,
    },
    {
        name: "Laranja",
        svg: OrangeIcon,
    },
    {
        name: "Uva",
        svg: GrapeIcon,
    },
    {
        name: "Manga",
        svg: MangoIcon,
    },
    {
        name: "Abacaxi",
        svg: PineappleIcon,
    },
    {
        name: "Morango",
        svg: StrawberryIcon,
    },
    {
        name: "Melancia",
        svg: WatermelonIcon,
    },
    {
        name: "Melão",
        svg: MelonIcon,
    },
    {
        name: "Pera",
        svg: PearIcon,
    },
    {
        name: "Limão",
        svg: LimonIcon,
    },
    {
        name: "Framboesa",
        svg: RaspberryIcon,
    },
    {
        name: "Cereja",
        svg: CherryIcon,
    },
    {
        name: "Pêssego",
        svg: PeachIcon,
    },
    {
        name: "Ameixa",
        svg: PlumIcon,
    },
];

const OBJECTS: GameItem[] = [
    {
        name: "Faca",
        svg: KnifeIcon,
    },
    {
        name: "Garfo",
        svg: ForkIcon,
    },
    {
        name: "Colher",
        svg: SpoonIcon,
    },
    {
        name: "Prato",
        svg: PlateIcon,
    },
    {
        name: "Copo",
        svg: CupIcon,
    },
    {
        name: "Panela",
        svg: PotIcon,
    },
    {
        name: "Mesa",
        svg: TableIcon,
    },
    {
        name: "Cadeira",
        svg: ChairIcon,
    },
    {
        name: "Sofá",
        svg: CouchIcon,
    },
    {
        name: "Cama",
        svg: BedIcon,
    },
    {
        name: "Travesseiro",
        svg: PillowIcon,
    },
    {
        name: "Cobertor",
        svg: BlanketIcon,
    },
    {
        name: "Livro",
        svg: BookIcon,
    },
    {
        name: "Caderno",
        svg: NotebookIcon,
    },
    {
        name: "Caneta",
        svg: PenIcon,
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
            (anim, i) => {
                return { 
                    id: `${i + 1}-a`,
                    type: 'animals',
                    name: anim.name,
                    svg: anim.svg,
                    state: 'hidden', 
                }
            } 
        ),
    'fruits': 
        FRUITS.map(
            (fru, i) => {
                return { 
                    id: `${i + 1}-a`,
                    type: 'fruits',
                    name: fru.name,
                    svg: fru.svg,
                    state: 'hidden',
                }
            } 
        ),
    'objects':
        OBJECTS.map(
            (obj, i) => {
                return { 
                    id: `${i + 1}-a`,
                    type: 'objects',
                    name: obj.name,
                    svg: obj.svg,
                    state: 'hidden',
                }
            } 
        ),
}