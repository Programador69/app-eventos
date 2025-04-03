import "@/app/modificar-invitado/estilo.css";
import { FaArrowLeft} from "react-icons/fa";
import { Inter } from 'next/font/google';
import FormularioModificarInvitado from "../componentes/formularioModificarInvitado";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ModificarInvitado() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/invitados">
                    <FaArrowLeft/>
                </a>
                <h1>Modificar invitado</h1>
            </header>

            <main>
                <FormularioModificarInvitado/>
            </main>
        </div>
    )
}