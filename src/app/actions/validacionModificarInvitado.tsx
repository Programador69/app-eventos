import { z } from "zod";

export const EsquemaModificarInvitado = z.object({
    id: z
        .string()
        .min(1, { message: "El id del evento debe ser un número positivo" })
        .regex(/^\d+$/, { message: "El id del evento debe ser un número positivo" }),
    invitado: z
        .string()
        .trim()
        .min(5, { message: "El nombre del invitado es requerido" })
        .max(50, { message: "El nombre del invitado no puede exceder los 50 caracteres" }),
    emailInvitado: z
        .string()
        .email({ message: "Debe ser un correo electrónico válido" })
        .trim(),
    telInvitado: z
        .string()
        .trim()
        .regex(/^\d{10}$/, { message: "Debe ser un número de teléfono válido de 10 dígitos" })
        .min(10)
        .max(10),
    acompanantes: z
        .string()
        .min(0, { message: "El número de acompañantes minimo es 0" })
        .regex(/^\d+$/, { message: "El número de acompañantes debe ser un número positivo" }),
    mesa: z
        .string()
        .trim()
        .min(1, { message: "El nombre de la mesa es requerido" })
});
