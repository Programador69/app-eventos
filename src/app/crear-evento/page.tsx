import "@/app/crear-evento/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import FormularioCrearEvento from "../componentes/formularioCrearEvento";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ModificarEvento() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Crear evento</h1>
            </header>

            <FormularioCrearEvento/>
        </div>
    ) 
}