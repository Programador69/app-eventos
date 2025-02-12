"use client";

import "@/app/crear-evento/estilo.css";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { MdEventNote, MdOutlineEmail, MdEvent,MdOutlineMessage } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { useState } from "react";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ModificarEvento() {
    const [archivo, setArchivo] = useState("");

    return (
        <div className={inter.className}>
            <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Modificar evento</h1>
            </header>

            <form>
                <div>
                    <label htmlFor="inputId">
                        <TbAlertSquare />
                    </label>
                    <input id="inputId" type="number" min={1} placeholder="Id del evento" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputEvento">
                        <MdEventNote />
                    </label>
                    <input id="inputEvento" type="text" placeholder="Nombre del evento" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputCliente">
                        <FaRegAddressCard />
                    </label>
                    <input id="inputCliente" type="text" placeholder="Nombre del cliente" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputEmail">
                        <MdOutlineEmail />
                    </label>
                    <input id="inputEmail" type="email" placeholder="Correo del cliente" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputTel">
                        <FaPhone />
                    </label>
                    <input id="inputTel" type="tel" placeholder="Numero del cliente" className={inter.className}/>
                </div>

                <div>
                    <p>
                        Fecha del evento
                    </p>
                    <label htmlFor="inputFecha">
                        <MdEvent />
                    </label>
                    <input id="inputFecha" type="date" className={inter.className}/>
                </div>

                <div>
                    <label htmlFor="inputMensaje">
                        <MdOutlineMessage />
                    </label>
                    <input id="inputMensaje" type="text" placeholder="Mensaje para sus invitados" className={inter.className}/>
                </div>

                <div id="divArchivo">
                    <label htmlFor="inputArchivo" id="labelArchivo">
                        <CiFileOn /> Lista de invitados
                    </label>
                    <input id="inputArchivo" type="file" className={inter.className} onChange={e => setArchivo(e.target.value)}/>
                    <p id="nombreArchivo">{archivo}</p>
                </div>

                <button id="registrarEvento" className={inter.className}>Modificar evento</button>
            </form>
        </div>
    )
}