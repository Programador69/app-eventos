"use client";

import "@/app/buscar-codigo/estilo.css";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';
import BuscarInvitado from "../actions/buscarInvitado";
import { useState } from "react";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function BuscarCodigo() {
    const [respuesta, setRespuesta] = useState("");
    const [idEvento, setIdEvento] = useState("");
    const [invitado, setInvitado] = useState("");

    async function handleButton() {
        const respuesta = await BuscarInvitado({idEvento, invitado});

        if (respuesta == null) {
            setRespuesta("No se encontró el invitado")
        }
        else {
            setRespuesta(respuesta)
        }
    }

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
                    <div>
                        <label htmlFor="inputInvitado">
                            <FaRegAddressCard />
                        </label>
                        <input
                            id="inputInvitado"
                            type="text"
                            placeholder="Nombre del invitado"
                            className={inter.className}
                            value={invitado}
                            onChange={(e) => setInvitado(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="inputId">
                            <TbAlertSquare />
                        </label>
                        <input
                            id="inputId"
                            type="number"
                            min={1}
                            placeholder="Id del evento"
                            className={inter.className}
                            value={idEvento}
                            onChange={(e) => setIdEvento(e.target.value)}/>
                    </div>

                    <div className="botonBuscar">
                        <button type="submit" className={inter.className} onClick={handleButton} >Buscar</button>
                    </div>
                </section>

                {
                    respuesta !== "" && (
                        <div className="respuesta">
                            <span>{respuesta}</span>
                        </div>
                    )
                }
            </main>
        </div>
    )
}