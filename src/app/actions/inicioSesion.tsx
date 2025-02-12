import { EsquemaInicioSesion, EstadoFormulario } from "./validacionInicio";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
// import { redirect } from 'next/navigation'


export async function inicioSesion(state: EstadoFormulario, formData: FormData) {
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

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contra, salt);
        console.log(hashedPassword);

        const usuario_bd = await sql`SELECT usuario, contra FROM usuarios WHERE usuario = ${usuario}`; // realizar la consulta a la base de datos
        console.log(usuario_bd); // Checar que devuelve para poder hacer la comparación

        // bcrypt.compare(contra, usuario_bd["contra"], (err, res) => {
        //     if (res) {
        //         redirect("/eventos");
        //     } else {
        //         alert("Usuario / contraseña no validos");
        //     }
        // });

        
    } catch (error) {
        console.error("Error validando usuario:", error);
        return {
            errors: { contra: ["Error validando usuario"] },
        };
    }
}

// Esto es para crear una contraseña hasheada
// try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(contra, salt);
//     console.log(hashedPassword);

// } catch (error) {
//         console.error("Error hashing password:", error);
//         return {
//             errors: { contra: ["Error hashing password"] },
//         };
//     }