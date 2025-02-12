import { Inter } from "next/font/google";
import AvisosLegales from "./avisosLegales";

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function Pie() {
    return (
        <footer className={inter.className} style={{paddingBottom: "20px"}}>
            <h4>Todos los derechos reservados</h4>
            <p>Aplicacion creada por Tecnologia Hux</p>
            <AvisosLegales/>
        </footer>
    )
}