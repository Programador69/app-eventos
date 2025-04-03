"use server";

import { createPool } from "@vercel/postgres";

type Data = {
    id: string,
    invitado: string,
    emailInvitado: string,
    telInvitado: string,
    acompanantes: string,
    mesa: string,
}


export async function ModificarInvitado(data: Data) {
    try {
        const {id, invitado, emailInvitado, telInvitado, acompanantes, mesa} = data;

        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })

        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        await pool.sql`UPDATE invitados set correo = ${emailInvitado}, telefono = ${telInvitado}, numero_acompanantes = ${acompanantes}, numero_mesa = ${mesa} WHERE id_evento = ${id} and nombre = ${invitado}`;
        pool.end();

    } catch (error) {
        console.error("Error validando usuario:", error);
        return {
            errors: { contra: ["Error añadiendo invitado"] },
        };
    }
}