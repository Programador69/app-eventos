"use server";

import { createPool } from "@vercel/postgres";
import desencriptar from "@/utils/auth";
import { cookies } from "next/headers";

type Encargado = {"usuario": string, "expira": string, "iat": number, "exp": number}

export default async function FechasOcupadas() {
    "use server";

    // obtener el id del organizador del evento
    const encargadoCifrado = (await cookies()).get("sesion");
    
    const encargadoJWT = await desencriptar(encargadoCifrado!.value);
    const encargado: Encargado  = JSON.parse(JSON.stringify(encargadoJWT.payload));
    const usuarioEncargado = encargado.usuario;
    
    const pool = createPool({
        connectionString: process.env.DATABASE_URL,
    })
    
    if (!pool) {
        throw new Error("La conexión a la base de datos no está inicializada")
    }

    const cosnultaEncargado = await pool.sql`SELECT _id FROM organizadores_eventos WHERE usuario = ${usuarioEncargado}`;
    const idEncargado = await cosnultaEncargado.rows[0]._id;

    const fechaActual = new Date().toISOString().split('T')[0];

    const fechasOcupadas = await pool.sql`SELECT fecha_evento FROM eventos WHERE fecha_evento >= ${fechaActual} and id_encargado = ${idEncargado}`;
    const fechas = fechasOcupadas.rows.map((fecha) => fecha.fecha_evento);
    
    return fechas;
}