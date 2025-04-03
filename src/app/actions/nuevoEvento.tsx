"use server";

import { VercelPool } from "@vercel/postgres";
import AvisarNuevoEvento from "./avisarNuevoEvento";
import { enviarInvitaciones } from "./enviarInvitaciones";

export default async function NuevoEvento(
    pool : VercelPool, correo: string, evento : string, idEncargado: string | number,
    fechaEvento : string, archivo: unknown[][] | undefined, mensajeEvento : string,
    cliente: string, emailCliente : string, telCliente: string) {
    
    AvisarNuevoEvento(correo, evento);
    await pool.sql`INSERT INTO eventos (id_encargado, nombre_evento, nombre_cliente, correo_cliente, telefono_cliente, fecha_evento, mensaje_invitados) VALUES (${idEncargado}, ${evento}, ${cliente}, ${emailCliente}, ${telCliente}, ${fechaEvento}, ${mensajeEvento})`;
        
    const consultaIdEvento = await pool.sql`SELECT _id FROM eventos WHERE fecha_evento = ${fechaEvento} and id_encargado = ${idEncargado}`;
    const idEvento = await consultaIdEvento.rows[0]._id;

    archivo?.shift();

    if (archivo?.length === undefined) {
        console.error("No hay invitados en el archivo, verifcalo!");
        return
    }

    for (let i = 0; i < archivo?.length; i++) {
        const nombre: string = archivo[i][0] as string;
        const correo: string = archivo[i][1] as string;
        const telefono: string = archivo[i][2] as string;
        const numAcompanantes: string = archivo[i][3] as string;
        const numMesa: string = archivo[i][4] as string;

        await pool.sql`INSERT INTO invitados (id_evento, nombre, correo, telefono, numero_acompanantes, numero_mesa) VALUES (${idEvento}, ${nombre}, ${correo}, ${telefono}, ${numAcompanantes}, ${numMesa})`;

        enviarInvitaciones({nombre, correo, numAcompanantes, numMesa, evento, mensajeEvento, fechaEvento, idEvento});
    }

    await pool.end();
}