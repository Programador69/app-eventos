import Link from "next/link";
import { invitados } from "../informacion/eventosInvitados";
import Pie from "../componentes/pie";
import Card from "../componentes/card";
import { Inter } from 'next/font/google';
import type { Viewport } from 'next'
import type { Metadata } from 'next'
import BotonCerrarSesion from "../componentes/botonCerrarSesion";
 
export const viewport: Viewport = {
  themeColor: '#2a89f6',
}
 
export const metadata: Metadata = {
  title: 'App Invitados',
  description: 'Organiza tus eventos y acomoda a tus invitados.'
}

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function PaginaInvitados() {
    return (
        <div id="paginaEventos" className={inter.className}>

            <header>
                <h1>Invitados</h1>
                <Link key={"linkEvento"} href="/eventos">Eventos</Link>
            </header>

            <main className="mainEventos">
                {
                    invitados.map(e => {
                        return (
                            <Card key={e.key} id={e.texto} texto={e.texto} img={e.img} link={e.link}/>
                        )
                    }
                )
                }
            </main>

            <aside style={{maxWidth: "70vw", textAlign: "center", margin: "auto"}}>
                <p>Imagenes generadas por la IA de Gemini y el estudio magico de Canva</p>
                <BotonCerrarSesion/>
            </aside>

            <Pie/>
        </div>
    )
}