type Datos = {
    id: string,
    texto: string,
    img: string,
    link: string
}

export default function Card({id, texto, img, link} : Datos) {
    const estilos = {
        background: `linear-gradient(#2229, #3337), url("/${img}")`,
        height: "130px",
        width: "360px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        fontSize: "1.4em"
    }

    return (
        <a href={link}>
            <section key={id} style={estilos} className="tarjetaEventos">
                <h2>{texto}</h2>
            </section>
        </a>
    )
}