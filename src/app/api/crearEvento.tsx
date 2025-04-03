"use server";

import desencriptar from "@/utils/auth";
import { createPool } from "@vercel/postgres";
import { cookies } from "next/headers";
import NuevoEvento from "../actions/nuevoEvento";

type Data = {
    evento: string,
    cliente: string,
    emailCliente: string,
    telCliente: string,
    fechaEvento: string,
    mensajeEvento: string,
    archivo: FileList
}

type Encargado = {"usuario": string, "expira": string, "iat": number, "exp": number}

export async function crearEvento(data: Data, archivo: unknown[][] | undefined) {
    try {
        const {evento, cliente, emailCliente, telCliente, fechaEvento, mensajeEvento} = data;

        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })

        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        // obtener el id del organizador del evento
        const encargadoCifrado = (await cookies()).get("sesion");

        if (!encargadoCifrado) {
            return {
                errors: { contra: ["No hay un usuario logeado"] },
            };
        }

        const encargadoJWT = await desencriptar(encargadoCifrado?.value);
        const encargado: Encargado  = JSON.parse(JSON.stringify(encargadoJWT.payload));
        const usuarioEncargado = encargado.usuario;

        const cosnultaEncargado = await pool.sql`SELECT _id, correo FROM organizadores_eventos WHERE usuario = ${usuarioEncargado}`;
        const idEncargado = await cosnultaEncargado.rows[0]._id;
        const correo = await cosnultaEncargado.rows[0].correo;

        await NuevoEvento(pool, correo, evento, idEncargado, fechaEvento, archivo, mensajeEvento, cliente, emailCliente, telCliente);
        
    } catch (error) {
        console.error("Error validando usuario:", error);
        return {
            errors: { contra: ["Error validando usuario"] },
        };
    }
}