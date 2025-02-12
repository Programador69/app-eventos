import "@/app/consultar-evento/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ConsultarEvento() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Consultar evento</h1>
            </header>

            <main>
                <section id="sectionInput">
                    <label htmlFor="inputId">
                        <TbAlertSquare />
                    </label>
                    <input id="inputId" type="number" min={1} placeholder="Id del evento" className={inter.className}/>
                </section>

                <section id="sectionCliente">
                    <span>Datos del cliente</span>
                    <ul>
                        <li>Nombre del cliente</li>
                        <li>Correo del cliente</li>
                        <li>Numero del cliente</li>
                    </ul>
                </section>
                
                <section id="sectionEvento">
                <span>Datos del evento</span>
                    <ul>
                        <li>Nombre del evento</li>
                        <li>Fecha del evento</li>
                        <li>Numero de invitados</li>
                        <li>Mensaje del evento</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}