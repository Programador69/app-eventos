"use server";

import { EsquemaInicioSesion, EstadoFormulario } from "./validacionInicio";
import bcrypt from "bcryptjs";
import { createPool } from "@vercel/postgres";
import { cookies } from "next/headers";
import {encriptar} from "@/utils/auth";

const URL = process.env.DATABASE_URL;

async function crearJWT(usuario: string) {
    const expira = new Date(Date.now() + 24 * 3600000); // 24 horas
    const sesion = await encriptar({usuario});

    (await cookies()).set("sesion", sesion, {expires: expira, httpOnly: true})

    return true
}


export async function inicioSesion(state: EstadoFormulario, formData: FormData) {
    try {
        const obteniendoCampos = EsquemaInicioSesion.safeParse({
            usuario: formData.get("usuario"),
            contra: formData.get("contra"),
        })

        if (!obteniendoCampos.success) {
            return {
                errors: obteniendoCampos.error.flatten().fieldErrors,
            }
        }

        const {usuario, contra} = obteniendoCampos.data

        const pool = createPool({
            connectionString: URL,
        })

        if (!pool) {
            throw new Error("La conexión a la base de datos no está inicializada")
        }

        const {rows} = await pool.sql`SELECT usuario, contrasena FROM organizadores_eventos WHERE usuario = ${usuario}`;
        await pool.end()

        const contraBD = await rows[0].contrasena;

        const res = await bcrypt.compare(contra, contraBD);

        if (res) {
            const cookie = await crearJWT(usuario);

            if (cookie) return {state: true}
            return {state: false}

          } else {
            return {state: false}
          }
        
    } catch (error) {
        console.error("Error validando usuario o creando la cookie:", error);
        return {
            errors: { contra: ["Error validando usuario"] },
        };
    }
}

// Esto es para crear una contraseña hasheada
// try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash("Programador.11", salt);
//     console.log(hashedPassword);

// } catch (error) {
//         console.error("Error hashing password:", error);
//         return {
//             errors: { contra: ["Error hashing password"] },
//         };
//     }