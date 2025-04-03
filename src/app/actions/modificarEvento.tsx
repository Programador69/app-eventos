"use server";

import desencriptar from "@/utils/auth";
import { createPool } from "@vercel/postgres";
import { cookies } from "next/headers";
import { enviarInvitaciones } from "./enviarInvitaciones";
import AvisarModificacionEvento from "./avisarModificacionEvento";

type Data = {
    id: string,
    evento: string,
    cliente: string,
    emailCliente: string,
    telCliente: string,
    fechaEvento: string,
    mensajeEvento: string,
}

type Encargado = {"usuario": string, "expira": string, "iat": number, "exp": number}

export default async function ModificarEvento(data: Data, archivo: unknown[][] | undefined) {
    try {
        const {id, evento, cliente, emailCliente, telCliente, fechaEvento, mensajeEvento} = data;

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

        const cosnultaEncargado = await pool.sql`SELECT correo FROM organizadores_eventos WHERE usuario = ${usuarioEncargado}`;
        const correo = await cosnultaEncargado.rows[0].correo;

        AvisarModificacionEvento(correo, evento);

        await pool.sql`UPDATE eventos SET nombre_evento=${evento}, nombre_cliente=${cliente}, correo_cliente=${emailCliente}, telefono_cliente=${telCliente}, fecha_evento=${fechaEvento}, mensaje_invitados=${mensajeEvento} WHERE _id = ${id}`;
                
        archivo?.shift();
        
        if (archivo?.length === undefined) {
            console.error("No hay invitados en el archivo!");
            return
        }else {
            await pool.sql`DELETE FROM invitados WHERE id_evento = ${id}`;
        
            for (let i = 0; i < archivo?.length; i++) {
                const nombre: string = archivo[i][0] as string;
                const correo: string = archivo[i][1] as string;
                const telefono: string = archivo[i][2] as string;
                const numAcompanantes: string = archivo[i][3] as string;
                const numMesa: string = archivo[i][4] as string;
            
                await pool.sql`INSERT INTO invitados (id_evento, nombre, correo, telefono, numero_acompanantes, numero_mesa) VALUES (${id}, ${nombre}, ${correo}, ${telefono}, ${numAcompanantes}, ${numMesa})`;
            
                enviarInvitaciones({nombre, correo, numAcompanantes, numMesa, evento, mensajeEvento, fechaEvento, idEvento: parseInt(id)});
            }
        }

        await pool.end();
        
    } catch (error) {
        console.error("Error modificando el evento:", error);
        return {
            errors: { contra: ["Error validando usuario"] },
        };
    }    
}