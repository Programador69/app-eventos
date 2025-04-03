"use server";

import { createPool } from "@vercel/postgres";

export default async function BuscarInvitado({idEvento, invitado}: {idEvento: string, invitado: string}) {
    "use server";

    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        })
            
        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        invitado = "%" + invitado.toLowerCase() + "%";

        const datos = await pool.sql`SELECT nombre, numero_acompanantes, numero_mesa FROM invitados WHERE id_evento = ${idEvento} and lower(nombre) LIKE ${invitado}`;
        
        if (datos.rows[0] == undefined) {
            await pool.end();
            return null;
        } 
        
        const nombre = await datos.rows[0].nombre;
        const numeroAcompanantes = await datos.rows[0].numero_acompanantes;
        const numeroMesa = await datos.rows[0].numero_mesa;

        const info = `Invitado: ${nombre}, Número de acompañantes: ${numeroAcompanantes}, Número de mesa: ${numeroMesa}`;
        await pool.end();

        return info;
    }
    catch(e) {
        console.error("Ocurrio un error en la consulta del invtiado: ", e)
    }
}