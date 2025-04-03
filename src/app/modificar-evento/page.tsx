"use client";

import "@/app/crear-evento/estilo.css";
import { FaArrowLeft} from "react-icons/fa";
import { Inter } from 'next/font/google';
import FormularioModificarEvento from "../componentes/formularioModificarEvento";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ModificarEvento() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Modificar evento</h1>
            </header>

            <FormularioModificarEvento/>
        </div>
    )
}