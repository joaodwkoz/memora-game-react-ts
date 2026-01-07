import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/Button";
import { CalendarIcon, Cog6ToothIcon, InformationCircleIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const today = new Date();

const OPTIONS = [
    {
        lib: CalendarIcon,
        name: 'Dias anteriores',
    },
    {
        lib: Cog6ToothIcon,
        name: 'Configurações',
    },
    {
        lib: InformationCircleIcon,
        name: 'Sobre',
    },  
    {
        lib: ChartBarIcon,
        name: 'Estatísticas',
    },
]

const MotionButton = motion.create(Button);

export function Home() {
    const navigate = useNavigate();

    const goToOtherPage = (page: string) => {
        navigate(`/${page}`);
    }

    return (
        <div className="w-screen h-screen bg-background">
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col gap-12 items-center">
                    <div className="flex flex-col gap-7 items-center">
                        <svg className="w-32 h-40 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm.01 16H17a1 1 0 0 0-.117 1.993l.127.007a1 1 0 0 0 0-2m-4.98-9.5l-.115.005c-.384.04-.724.273-.898.623l-.51 1.027l-1.138.166c-.423.059-.78.357-.914.768l-.033.125a1.13 1.13 0 0 0 .322 1.039l.82.797l-.194 1.127c-.07.432.107.857.454 1.108l.107.068a1.13 1.13 0 0 0 1.078.018l1.022-.536l1.019.535c.377.2.84.168 1.19-.086l.1-.08c.281-.259.416-.645.35-1.028l-.194-1.126l.823-.799c.31-.302.42-.752.287-1.161l-.042-.11a1.13 1.13 0 0 0-.873-.659l-1.138-.166l-.508-1.026a1.13 1.13 0 0 0-1.014-.63M7.01 4H7a1 1 0 0 0-.117 1.993L7.01 6a1 1 0 1 0 0-2"/></svg>

                        <p className="font-semibold text-5xl text-primary tracking-tight leading-none">
                            Memora
                        </p>
                    </div>

                    <Button
                        size='custom' 
                        variant='custom' 
                        className="cursor-pointer w-86 border-2 border-border rounded-lg bg-surface p-3.5 flex items-center justify-between"
                        onClick={
                            () => goToOtherPage('daily')
                        }
                    >
                        <div className="flex flex-col gap-2.5">
                            <p className="font-semibold text-base tracking-normal leading-none text-left text-white">
                                Jogue o desafio diário!
                            </p>

                            <p className="font-medium text-xs tracking-normal leading-none text-left text-white/60">
                                { today.toLocaleString('pt-BR').slice(0, 10) }
                            </p>
                        </div>

                        <motion.div 
                            whileHover={{
                                y: -3,
                                transition: { duration: 0.1 }
                            }}
                            className="w-18 h-8 rounded-sm bg-secondary flex items-center justify-center"
                        >
                            <p className="font-medium text-xs tracking-normal leading-none text-white">
                                Jogar
                            </p>
                        </motion.div>
                    </Button>

                    <div className="flex flex-col gap-4 items-center">
                        {
                            OPTIONS.map(
                                (opt, i) => (
                                    <MotionButton
                                        whileHover={{
                                            backgroundColor: '#19212F',
                                            transition: { duration: 0.1 }
                                        }}
                                        key={i.toString()}
                                        size="custom" 
                                        variant="custom" 
                                        className="w-48 flex items-center gap-3 p-4 rounded-lg"
                                    >
                                        <opt.lib color="white" className="w-6 h-6" />

                                        <p className="font-medium text-base tracking-normal text-white leading-none">
                                            { opt.name }
                                        </p>
                                    </MotionButton>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}