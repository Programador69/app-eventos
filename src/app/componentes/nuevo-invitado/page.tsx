import "@/app/nuevo-invitado/estilo.css";
import { TbAlertSquare } from "react-icons/tb";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { FaPhone, FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineEmail, MdNoteAlt } from "react-icons/md";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

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
                    <label htmlFor="inputEmail">
                        <MdOutlineEmail />
                    </label>
                    <input id="inputEmail" type="email" placeholder="Correo electronico" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputTel">
                        <FaPhone />
                    </label>
                    <input id="inputTel" type="tel" placeholder="Numero de teléfono" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputExtras">
                        <FaPeopleGroup />
                    </label>
                    <input id="inputExtras" type="number" className={inter.className} placeholder="Numero de acompañantes"/>
                </div>

                <div>
                    <label htmlFor="inputMesa">
                        <MdNoteAlt />
                    </label>
                    <input id="inputMesa" type="text" placeholder="Numero de mesa" className={inter.className}/>
                </div>

                <button id="registrarInvitado" className={inter.className}>Añadir</button>
            </form>
            </main>
        </div>
    )
}