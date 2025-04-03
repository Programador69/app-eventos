"use client";

import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone, FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineEmail, MdNoteAlt } from "react-icons/md";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EsquemaNuevoInvitado } from "../actions/validacionNuevoInvitado";
import { AnadirInvitado } from "../api/anadirInvitado";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function FormularioNuevoInvitado() {
    const { register, handleSubmit, reset, formState:{errors} } = useForm({
        resolver: zodResolver(EsquemaNuevoInvitado)
      });

    const onSubmit = async(data: {
        id: string;
        invitado: string;
        emailCliente: string;
        telCliente: string;
        acompanantes: string;
        mesa: string;
    }) =>  {
        try {
          await AnadirInvitado(data);
    
          alert("Invitado añadido con exito!");
        }
        catch (error) {
          console.error("Ocurrio un error al añadir al invitado", error);
          alert("Ocurrio un error al añadir al invitado, por favor intenta de nuevo");
        }
        finally {
          reset();
        }
      }
      
    return (
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
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
                    {...register("id")}/>
            </div>
            {errors.id ? <span style={{color: '#f00'}}>{errors.id.message}</span> : <></>}

            <div>
                <label htmlFor="inputInvitado">
                    <FaRegAddressCard />
                </label>
                <input
                    id="inputInvitado"
                    type="text"
                    placeholder="Nombre del invitado"
                    className={inter.className}
                    {...register("invitado")}/>
            </div>
            {errors.invitado ? <span style={{color: '#f00'}}>{errors.invitado.message}</span> : <></>}

            <div>
                <label htmlFor="inputEmail">
                    <MdOutlineEmail />
                </label>
                <input
                    id="inputEmail"
                    type="email"
                    placeholder="Correo electronico"
                    className={inter.className}
                    {...register("emailCliente")}/>
            </div>
            {errors.emailCliente ? <span style={{color: '#f00'}}>{errors.emailCliente.message}</span> : <></>}

            <div>
                <label htmlFor="inputTel">
                    <FaPhone />
                </label>
                <input
                    id="inputTel"
                    type="tel"
                    placeholder="Numero de teléfono"
                    className={inter.className}
                    {...register("telCliente")}/>
            </div>
            {errors.telCliente ? <span style={{color: '#f00'}}>{errors.telCliente.message}</span> : <></>}

            <div>
                <label htmlFor="inputExtras">
                    <FaPeopleGroup />
                </label>
                <input
                    id="inputExtras"
                    type="number"
                    className={inter.className}
                    placeholder="Numero de acompañantes"
                    {...register("acompanantes")}/>
            </div>
            {errors.acompanantes ? <span style={{color: '#f00'}}>{errors.acompanantes.message}</span> : <></>}

            <div>
                <label htmlFor="inputMesa">
                    <MdNoteAlt />
                </label>
                <input
                    id="inputMesa"
                    type="text"
                    placeholder="Numero de mesa"
                    className={inter.className}
                    {...register("mesa")}/>
            </div>
            {errors.mesa ? <span style={{color: '#f00'}}>{errors.mesa.message}</span> : <></>}

            <button id="registrarInvitado" className={inter.className}>Añadir</button>
        </form>
    )
}