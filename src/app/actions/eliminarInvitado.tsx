"use server";

import { createPool } from "@vercel/postgres";

export default async function EliminarInvitado(id:string, invitado: string, telefono: string) {
    "use server";

    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })
            
        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada");
        }

        await pool.sql`DELETE FROM invitados WHERE id_evento = ${id} and telefono = ${telefono} and nombre = ${invitado}`;

        await pool.end();

        return true;
    }
    catch(e) {
        console.error("Ocurrio un error al eliminar el evento: ", e);
        return false;
    }
}