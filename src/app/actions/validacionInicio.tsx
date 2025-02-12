import {z} from "zod";

export const EsquemaInicioSesion = z.object(
    {
        usuario: z
        .string()
        .min(4, {message: "Minimo son 4 caracteres"})
        .trim(),
        contra: z
        .string()
        .min(8, {message: "Al menos 8 caracteres"})
        .trim()
    }
)

export type EstadoFormulario = {
    errors?: {
        usuario?: string[]
        contra?: string[]
    }
    message?: string
}
|
undefined