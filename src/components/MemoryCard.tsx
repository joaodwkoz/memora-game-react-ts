import type { Card } from "../types";

interface MemoryCardProps extends Card {
  hasOvertimeStyle?: boolean | null;
  onClick?: () => void,
}

export function MemoryCard({ name, svg, state, hasOvertimeStyle = false, onClick }: MemoryCardProps) {
    const Icon = svg;

    const isShown = state === "shown";

    const defaultClasses = "cursor-pointer relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d";
    const isShownClass = isShown ? "rotate-y-180" : "";

    const customClass = `${defaultClasses} ${isShownClass}`

    return (
        <div className="w-24 h-32 perspective-1000" onClick={onClick}>
            <div className={customClass}>
                <div className="absolute inset-0 rounded-2xl color-card border-3 border-border-muted flex items-center justify-center backface-hidden p-3 hover:-translate-y-1.5 hover:border-border group">
                    <div className="w-full h-full rounded-lg border-3 border-border-muted flex items-center justify-center group-hover:border-border">
                        <svg className="w-12 h-12 text-secondary-muted group-hover:text-secondary" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000, 512.000000) scale(0.100000,-0.100000)"
                            fill="currentColor" stroke="none">
                                <path d="M3166 5079 c-14 -11 -31 -30 -38 -42 -13 -25 -120 -1298 -109 -1309
                                3 -3 316 -108 696 -233 379 -125 696 -230 704 -233 12 -4 13 22 9 176 l-5 181
                                26 5 c14 3 76 12 136 21 240 35 373 142 464 372 76 193 77 197 61 245 -27 77
                                -34 78 -405 91 l-325 11 -80 123 c-44 67 -92 130 -106 140 -24 15 -175 47
                                -591 123 l-121 22 -73 136 c-86 162 -113 192 -174 192 -28 0 -51 -7 -69 -21z"/>
                                <path d="M2689 3242 c-270 -271 -419 -436 -579 -642 -494 -636 -738 -1267
                                -799 -2063 -5 -65 -11 -120 -13 -122 -2 -3 -49 18 -105 45 -238 117 -391 278
                                -460 485 -25 74 -27 92 -27 250 0 196 10 245 78 390 52 110 142 225 235 300
                                73 59 83 75 83 131 0 46 -25 82 -70 101 -37 16 -43 15 -143 -14 -12 -3 -18 4
                                -23 31 -11 58 -44 88 -103 93 -66 7 -89 -9 -138 -92 l-38 -65 -18 29 c-26 43
                                -58 61 -107 61 -36 0 -49 -6 -76 -32 -28 -29 -36 -54 -76 -215 l-44 -181 -41
                                1 c-105 4 -148 -73 -110 -197 19 -63 20 -59 -16 -75 -37 -16 -69 -65 -69 -104
                                0 -16 16 -82 37 -147 l36 -118 -46 -52 c-47 -52 -65 -100 -52 -138 3 -12 28
                                -51 55 -88 49 -67 49 -68 43 -128 l-5 -61 69 -90 c184 -238 450 -417 690 -465
                                238 -47 316 -50 1458 -50 l1073 0 31 26 c39 33 53 82 41 146 -15 75 -44 132
                                -96 188 -55 58 -126 95 -214 109 -34 6 -65 12 -67 15 -2 2 118 115 266 251
                                149 137 271 253 271 258 0 6 2 8 5 5 3 -3 26 -180 50 -393 49 -436 55 -458
                                141 -534 73 -64 106 -71 355 -71 l218 0 36 35 c32 33 35 41 35 93 -1 126 -90
                                241 -213 274 l-44 11 -6 210 c-4 116 -7 434 -7 707 0 392 3 506 14 542 7 25
                                37 87 65 136 137 237 188 470 175 803 l-7 176 -734 242 c-404 133 -739 244
                                -746 246 -7 1 -127 -112 -268 -253z"/>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="absolute inset-0 rounded-2xl color-card border-3 border-border flex items-center justify-center rotate-y-180 backface-hidden p-3">
                    <div className="h-full w-full">
                        <div className="aspect-square w-full rounded-md bg-primary flex items-center p-4">
                            {
                                Icon && (
                                    <Icon className="w-full h-full text-white" />
                                )
                            }
                        </div>

                        <div className="h-10 flex items-center justify-center">
                            <p className="font-medium text-xs leading-none text-white truncate">
                                { name }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
