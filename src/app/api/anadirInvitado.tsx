"use server";

import { createPool } from "@vercel/postgres";

type Data = {
    id: string,
    invitado: string,
    emailCliente: string,
    telCliente: string,
    acompanantes: string,
    mesa: string,
}


export async function AnadirInvitado(data: Data) {
    try {
        const {id, invitado, emailCliente, telCliente, acompanantes, mesa} = data;

        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })

        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        await pool.sql`INSERT INTO invitados (id_evento, nombre, correo, telefono, numero_acompanantes, numero_mesa) VALUES (${id}, ${invitado}, ${emailCliente}, ${telCliente}, ${acompanantes}, ${mesa})`;
        pool.end();

    } catch (error) {
        console.error("Error validando usuario:", error);
        return {
            errors: { contra: ["Error añadiendo invitado"] },
        };
    }
}