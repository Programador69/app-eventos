import "@/app/eliminar-invitado/estilo.css";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function EliminarInvitado() {
    return (
        <div>
            <header>
                <a href="/invitados">
                    <FaArrowLeft/>
                </a>
                <h1>Eliminar Invitado</h1>
            </header>

            <main>
                <form>
                <div>
                    <label htmlFor="inputId">
                        <TbAlertSquare />
                    </label>
                    <input id="inputId" type="number" min={1} placeholder="Id del evento" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputInvitado">
                        <FaRegAddressCard />
                    </label>
                    <input id="inputInvitado" type="text" placeholder="Nombre del invitado" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputTel">
                        <FaPhone />
                    </label>
                    <input id="inputTel" type="tel" placeholder="Numero de teléfono" className={inter.className}/>
                </div>

                <button id="registrarInvitado" className={inter.className}>Eliminar invitado</button>
            </form>
            </main>
        </div>
    )
}