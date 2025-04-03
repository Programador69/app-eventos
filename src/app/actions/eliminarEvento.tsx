"use server";

import { createPool } from "@vercel/postgres";
import sgMail from "@sendgrid/mail";
import ObtenerEncargado from "../actions/obtenerEncargado";
import { error } from "console";

export default async function EliminarEventoBD(id:string, cliente: string) {
    "use server";

    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })
            
        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        await pool.sql`DELETE FROM invitados WHERE id_evento = ${id}`;
        await pool.sql`DELETE FROM eventos WHERE _id = ${id}`;

        const encargado = await ObtenerEncargado();
        if (encargado == null) {
            throw error("Regreso null el obtener encargado")
        }
            
        const correoEncargado = await pool.sql`SELECT correo FROM organizadores_eventos WHERE usuario = ${encargado}`;
        const correo = await correoEncargado.rows[0].correo;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

        const msg = {
            to: correo,
            from: 'tecnologia_hux@hotmail.com', 
            subject: 'Invitacion',
            html: `<><h1>Evento ${id} eliminado</h1> <h2>${cliente} dio la orden</h2></>`
        }
            
        sgMail.send(msg)
        .then((res) => {
            console.log("Todo salio bien", res)
        })
        .catch((e) => {
            console.error("Ocurrio un error mandando el correo", e)
        })

        await pool.end();

    }
    catch(e) {
        console.error("Ocurrio un error al eliminar el evento: ", e);
    }
}