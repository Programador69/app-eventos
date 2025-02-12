import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function Crear() {
    return (
        <div className="divNuevaCuenta" >
            <h1 className={inter.className}>Crear nueva cuenta</h1>
            <p className={inter.className}>Para eso es necesario que envies una solicitud al sigueinte correo: <a href="mailto:manolo1025@protonmail.com" target="_BLANK" referrerPolicy="no-referrer" >manolo1025@protonmail.com</a></p>
            <a href="../" className={inter.className}>Regresar a inicio</a>
        </div>
    )
}