import "@/app/eliminar-evento/estilo.css";
import { FaArrowLeft, FaRegAddressCard } from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"], weight: "700", style: ["italic"]})

export default function EliminarEvento() {
    return (
        <div className={inter.className}>
            <header>
                <a href="/eventos">
                    <FaArrowLeft/>
                </a>
                <h1>Eliminar evento</h1>
            </header>

            <main>
                <section>
                    <form>
                        <div>
                            <label htmlFor="inputId">
                                <TbAlertSquare />
                            </label>
                            <input id="inputId" type="number" min={1} placeholder="Id del evento" className={inter.className}/>
                        </div>

                        <div>
                            <label htmlFor="inputCliente">
                                <FaRegAddressCard />
                            </label>
                            <input id="inputCliente" type="text" placeholder="Nombre de quien solicito la eliminación" className={inter.className}/>
                        </div>

                        <button className={inter.className}>Eliminar evento</button>
                    </form>
                </section>
            </main>
        </div>
    )
}