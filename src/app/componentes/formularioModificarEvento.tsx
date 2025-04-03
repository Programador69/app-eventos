"use client";

import {
  MdEventNote,
  MdOutlineEmail,
  MdEvent,
  MdOutlineMessage,
} from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter } from "next/font/google";
import { useState, ChangeEvent } from "react";
import { lecturaArchivo } from "../actions/subidaArchivo";
import { EsquemaModificarEvento } from "../actions/validacionModificarEvento";
import ModificarEvento from "../actions/modificarEvento";
import { TbAlertSquare } from "react-icons/tb";

const inter = Inter({ subsets: ["latin"], weight: "700", style: ["italic"] });

export default function FormularioModificarEvento() {
  const [archivo, setArchivo] = useState<unknown[][] | undefined>(undefined);

  const { register, handleSubmit, reset, formState:{errors} } = useForm({
    resolver: zodResolver(EsquemaModificarEvento)
  });

  const subidaArchivo = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const arch = files[0];
    if (!arch) return;

    const lector = new FileReader();

    lector.onload = async (e) => {
      const datosBinarios = e.target?.result;

      try {
        const res = await lecturaArchivo(datosBinarios);

        setArchivo(res)

      }catch (error) {
        console.error("Ocurrio un error al procesar el archivo", error);
      }
    }

    lector.onerror = (e) => {
      console.log("Ocurrio un error al procesar el archivo", e);
    }

    lector.readAsArrayBuffer(arch);
  }

  const onSubmit = async(data: {
    id: string;
    evento: string;
    cliente: string;
    emailCliente: string;
    telCliente: string;
    fechaEvento: string;
    mensajeEvento: string;
}) =>  {
    try {
      await ModificarEvento(data, archivo);

      alert("Evento modificado con exito!");
    }
    catch (error) {
      console.error("Ocurrio un error al crear el evento", error);
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
          {...register("id")}
          type="number"
          placeholder="Id del evento"
          className={inter.className}
        />
      </div>

      <div>
        <label htmlFor="inputEvento">
          <MdEventNote />
        </label>
        <input
          id="inputEvento"
          {...register("evento")}
          type="text"
          placeholder="Nombre del evento"
          className={inter.className}
        />
      </div>
        {errors.evento ? <span style={{color: '#f00'}}>{errors.evento.message}</span> : <></>}

      <div>
        <label htmlFor="inputCliente">
          <FaRegAddressCard />
        </label>
        <input
          id="inputCliente"
          {...register("cliente")}
          type="text"
          placeholder="Nombre del cliente"
          className={inter.className}
        />
      </div>
        {errors.cliente ? <span style={{color: '#f00'}}>{errors.cliente.message}</span> : <></>}

      <div>
        <label htmlFor="inputEmail">
          <MdOutlineEmail />
        </label>
        <input
          id="inputEmail"
          {...register("emailCliente")}
          type="email"
          placeholder="Correo del cliente"
          className={inter.className}
        />
      </div>
        {errors.emailCliente ? <span style={{color: '#f00'}}>{errors.emailCliente.message}</span> : <></>}

      <div>
        <label htmlFor="inputTel">
          <FaPhone />
        </label>
        <input
          id="inputTel"
          {...register("telCliente")}
          type="tel"
          placeholder="Numero del cliente"
          className={inter.className}
        />
      </div>
        {errors.telCliente ? <span style={{color: '#f00'}}>{errors.telCliente.message}</span> : <></>}

      <div>
        <p>Fecha del evento</p>
        <label htmlFor="inputFecha">
          <MdEvent />
        </label>
        <input
          id="inputFecha"
          {...register("fechaEvento")}
          type="date"
          className={inter.className}
        />
      </div>
        {errors.fechaEvento ? <span style={{color: '#f00'}}>{errors.fechaEvento.message}</span> : <></>}

      <div>
        <label htmlFor="inputMensaje">
          <MdOutlineMessage />
        </label>
        <input
          id="inputMensaje"
          {...register("mensajeEvento")}
          type="text"
          placeholder="Mensaje para sus invitados"
          className={inter.className}
        />
      </div>
        {errors.mensajeEvento ? <span style={{color: '#f00'}}>{errors.mensajeEvento.message}</span> : <></>}

      <div id="divArchivo">
        <label htmlFor="inputArchivo" id="labelArchivo">
          <CiFileOn /> Lista de invitados (opcional)
        </label>
        <input
          id="inputArchivo"
          {...register("archivo")}
          type="file"
          accept=".xlsx, .xls"
          className={inter.className}
          onChange={subidaArchivo}
        />
      </div>
        {errors.archivo ? <span style={{color: '#f00'}}>{errors.archivo.message}</span> : <></>}

      <button id="registrarEvento" className={inter.className} type="submit">
        Modificar evento
      </button>
    </form>
  );
}
