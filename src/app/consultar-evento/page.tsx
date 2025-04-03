"use client";

import "@/app/consultar-evento/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';
import { useState } from "react";
import BuscarEvento from "../actions/buscarEvento";
import { MdOutlineContentPasteSearch } from "react-icons/md";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ConsultarEvento() {
    const [idEvento, setIdEvento] = useState("");
    const [{nombreCliente, correoCliente, numeroCliente, nombreEvento, fechaEvento, numeroInvitados, mensajeEvento}, setDatos] = useState({
        nombreCliente: "", correoCliente: "", numeroCliente: "", nombreEvento: "", fechaEvento: "", numeroInvitados: "", mensajeEvento: ""
    });

    async function obtenerEvento() {
        const datos = await BuscarEvento(idEvento);

        if (datos?.nombreEvento == "" || datos == null) {
            alert("No hay datos para mostrar");
            return;
        }

        setDatos(datos!);
    }

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
                    <input id="inputId" type="number" min={1} placeholder="Id del evento" className={inter.className} value={idEvento} onChange={(e) => setIdEvento(e.target.value)}/>
                    <MdOutlineContentPasteSearch onClick={obtenerEvento} style={{fontSize: "1.8em", position: "absolute", marginLeft: "10px"}} />
                </section>

                {
                    nombreCliente == "" ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <section id="sectionCliente">
                                    <span>Datos del cliente</span>
                                    <ul>
                                        <li>Nombre del cliente: {nombreCliente}</li>
                                        <li>Correo del cliente: {correoCliente}</li>
                                        <li>Numero del cliente: {numeroCliente}</li>
                                    </ul>
                                </section>
                                
                                <section id="sectionEvento">
                                <span>Datos del evento</span>
                                    <ul>
                                        <li>Nombre del evento: {nombreEvento}</li>
                                        <li>Fecha del evento: {fechaEvento}</li>
                                        <li>Numero de invitados: {numeroInvitados}</li>
                                        <li>Mensaje del evento: {mensajeEvento}</li>
                                    </ul>
                                </section>
                        </>                        
                    )
                }

            </main>
        </div>
    )
}