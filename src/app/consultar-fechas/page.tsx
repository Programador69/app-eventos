import "@/app/consultar-fechas/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { Inter } from 'next/font/google';
import IterarFechas from "../actions/iterarFechas";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default async function ConsultarFechas() {
  const datos = await IterarFechas();

    return (
        <div className={inter.className}>
          <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Consultar fechas</h1>
            </header>

            <main>
              {
                datos.map(dia => {
                  const color = dia.ocupado ? "#fd4447" : "#8DC693" ;
                  return (
                    <article key={dia.fecha} style={{backgroundColor: color}}>
                      <span>{dia.fecha}</span>
                    </article>
                  )
                })
              }
            </main>
        </div>
    )
}