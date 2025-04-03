"use server";

import { createPool } from "@vercel/postgres";

export default async function BuscarEvento(idEvento: string) {
    "use server";

    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })
            
        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        const datos = await pool.sql`SELECT nombre_evento, nombre_cliente, correo_cliente, telefono_cliente, fecha_evento, mensaje_invitados FROM eventos WHERE _id = ${idEvento}`;
        const invitados = await pool.sql`SELECT COUNT(*) as suma from invitados WHERE id_evento = ${idEvento}`;

        const sumaInvitados = await invitados.rows[0].suma;

        if (datos.rows[0] == undefined) {
            await pool.end();
            return null;
        } 

        const info = {
            nombreCliente: await datos.rows[0].nombre_cliente,
            correoCliente: await datos.rows[0].correo_cliente,
            numeroCliente: await datos.rows[0].telefono_cliente,
            nombreEvento: await datos.rows[0].nombre_evento || "",
            fechaEvento: await datos.rows[0].fecha_evento,
            numeroInvitados: sumaInvitados,
            mensajeEvento: await datos.rows[0].mensaje_invitados
        }

        await pool.end();

        return info;
    }
    catch(e) {
        console.error("Ocurrio un error en la consulta del evento: ", e)
    }
}