"use client";

import "@/app/eliminar-invitado/estilo.css";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';
import { useState } from "react";
import EliminarInvitadoBd from "../actions/eliminarInvitado";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function EliminarInvitado() {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    async function accionEliminar() {
        const respuesta = await EliminarInvitadoBd(id, nombre, telefono);

        if (respuesta) {
            setId("");
            setNombre("");
            setTelefono("");
            alert("El invitado ha sido eliminado correctamente");
        }
        else {
            alert("Ocurrio un error al eliminar el invitado");
        }
    }

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
                    <input
                        id="inputId"
                        type="number"
                        min={1}
                        placeholder="Id del evento"
                        className={inter.className}
                        value={id}
                        onChange={(e) => setId(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="inputInvitado">
                        <FaRegAddressCard />
                    </label>
                    <input 
                        id="inputInvitado"
                        type="text"
                        placeholder="Nombre del invitado"
                        className={inter.className}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="inputTel">
                        <FaPhone />
                    </label>
                    <input
                        id="inputTel"
                        type="tel"
                        placeholder="Numero de teléfono del invitado"
                        className={inter.className}
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}/>
                </div>

                <button id="registrarInvitado" className={inter.className} onClick={accionEliminar}>Eliminar invitado</button>
            </form>
            </main>
        </div>
    )
}