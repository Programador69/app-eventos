import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function Recuperacion() {
    return (
        <div className="divRecuperarCuenta" >
            <h1 className={inter.className}>Recuperar cuenta</h1>
            <form className={inter.className}>
                <div>
                    <label>Pon tu nombre de usuario</label>
                    <input type="text" placeholder="Usuario" required className={inter.className}/>
                </div>

                <div>
                    <label>Pon tu correo electronico</label>
                    <input type="email" placeholder="correo@ejemplo.com" required className={inter.className} />
                </div>

                <div>
                    <label>Pon tu nueva contraseña</label>
                    <input type="password" placeholder="********" />
                </div>

                <button type="submit" className={inter.className} >Cambiar contraseña</button>
            </form>

            <a href="../" className={inter.className} >Regresar a inicio</a>
        </div>
    )
}