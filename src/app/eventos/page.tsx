import Link from "next/link";
import { eventos } from "../informacion/eventosInvitados";
import Pie from "../componentes/pie";
import CardEvento from "../componentes/card";
import { Inter } from 'next/font/google';
import type { Viewport } from 'next'
import type { Metadata } from 'next'
 
export const viewport: Viewport = {
  themeColor: '#2a89f6',
}
 
export const metadata: Metadata = {
  title: 'App Invitados',
  description: 'Organiza tus eventos y acomoda a tus invitados.'
}

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function PaginaEventos() {
    return (
        <div id="paginaEventos" className={inter.className}>

            <header>
                <h1>Eventos</h1>
                <Link key={"linkInvitado"} href="/invitados">Invitados</Link>
            </header>

            <main className="mainEventos">
                {
                    eventos.map(e => {
                        return (
                            <CardEvento key={e.key} id={e.texto} texto={e.texto} img={e.img} link={e.link}/>
                        )
                    }
                )
                }
            </main>

            <aside style={{maxWidth: "70vw", textAlign: "center", margin: "auto"}}>
                <p>Imagenes generadas por la IA de Gemini y el estudio magico de Canva</p>
            </aside>

            <Pie/>
        </div>
    )
}