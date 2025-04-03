"use server";

import desencriptar from "@/utils/auth";
import { cookies } from "next/headers";

type Encargado = {"usuario": string, "expira": string, "iat": number, "exp": number};

export default async function ObtenerEncargado() {
    try {
         const encargadoCifrado = (await cookies()).get("sesion");
            
         if (!encargadoCifrado) {
             return null
         }
         
         const encargadoJWT = await desencriptar(encargadoCifrado?.value);
         const encargado: Encargado  = JSON.parse(JSON.stringify(encargadoJWT.payload));
         const usuarioEncargado = encargado.usuario;

         return usuarioEncargado
    }
    catch(e) {
        console.error("Ocurrio un error al obtener el encargado: ", e)
        return null
    }
}