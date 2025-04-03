"use client";

import { useActionState, useEffect } from 'react';
import { inicioSesion } from '../actions/inicioSesion';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function Formulario() {
    const router = useRouter();

    const [state, action, pending] = useActionState(inicioSesion, undefined);

    useEffect(()=> {
        if (state?.state == true) {
            router.push("/eventos")

        } else if(state?.state == false) {
            alert("Usuario o contraseña incorrectos");
        }

    }, [state?.state, router])

    return (
        <form action={action}>
            <label htmlFor='usuario' >Usuario:</label>
            <input id='usuario' name='usuario' type='text' placeholder='Ingresa tu nombre de ususario' required className={inter.className}/>
            {state?.errors?.usuario && <p>{state.errors.usuario}</p>}
        
            <label htmlFor='contra' >Contraseña:</label>
            <input id='contra' name='contra' type='password' placeholder='Ingresa tu contraseña' required className={inter.className} />
            {state?.errors?.contra && <p>{state.errors.contra}</p>}
        
            <button type="submit" disabled={pending}>Iniciar sesion</button>
        </form>
    )
}