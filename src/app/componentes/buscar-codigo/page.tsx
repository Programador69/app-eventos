import "@/app/buscar-codigo/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function BuscarCodigo() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/invitados">
                    <FaArrowLeft/>
                </a>
                <h1>Buscar por código</h1>
            </header>

            <main>
                <section>
                    <label htmlFor="inputId">
                        <TbAlertSquare />
                    </label>
                    <input id="inputId" type="number" min={1} placeholder="Codigo del invitado" className={inter.className}/>
                </section>
            </main>
        </div>
    )
}