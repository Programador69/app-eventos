import "@/app/nuevo-invitado/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { Inter } from 'next/font/google';
import FormularioNuevoInvitado from "../componentes/formularioNuevoInvitado";

export const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function NuevoInvitado() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/invitados">
                    <FaArrowLeft/>
                </a>
                <h1>Añadir invitado</h1>
            </header>

            <main>
                <FormularioNuevoInvitado/>
            </main>
        </div>
    )
}