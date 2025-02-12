import "@/app/consultar-fechas/estilo.css";
import { FaArrowLeft } from "react-icons/fa";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function ConsultarFechas() {
  const datos = iterarFechas();

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

const iterarFechas = () => {
  const fechas = [];

  const hoy = new Date();
  const actualYear = hoy.toISOString().slice(0, 4);

  const newYear = parseInt(actualYear, 10) + 1;
  const nuevoHoy = new Date();
  nuevoHoy.setFullYear(newYear);

  while (hoy <= nuevoHoy) {
    if(fechasOcuapdas.includes(hoy.toISOString().slice(0, 10))) {
      fechas.push({fecha: hoy.toISOString().slice(0, 10), ocupado: true});
    }
    else {
      fechas.push({fecha: hoy.toISOString().slice(0, 10), ocupado: false});
    }

    hoy.setDate(hoy.getDate() + 1);
  }

  return fechas
}

const fechasOcuapdas = ["2025-01-29", "2025-01-30", "2025-02-22", "2025-02-25", "2025-03-01" ]