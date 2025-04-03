import { z } from "zod";

export const EsquemaModificarEvento = z.object({
    id: z
        .string()
        .min(1, { message: "El id del evento es requerido" })
        .regex(/^\d+$/, { message: "El id del evento debe ser un número" }),
    evento: z
        .string()
        .min(4, { message: "Minimo son 4 caracteres" })
        .trim(),
    cliente: z
        .string()
        .min(4, { message: "Minimo son 4 caracteres" })
        .trim(),
    emailCliente: z
        .string()
        .email({ message: "Debe ser un correo electrónico válido" })
        .trim(),
    telCliente: z
        // .string().refine(num => !isNaN(parseInt(num)), {message: "Debes ingresar un numero telefonico valido"})
        .string()
        .trim()
        .regex(/^\d{10}$/, { message: "Debe ser un número de teléfono válido de 10 dígitos" })
        .min(10)
        .max(10),
    fechaEvento: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Debe ser una fecha válida en formato YYYY-MM-DD" })
        .trim(),
    mensajeEvento: z
        .string()
        .min(4, { message: "Minimo son 4 caracteres" })
        .trim(),
    archivo: z
    .custom<FileList>((file) => {
        if (!(file instanceof FileList)) {
            return false
        }

        if (file[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return false
        }

        return true
    }, {
        message: "Debes proporcionar un archivo EXCEL valido"
    })
});
