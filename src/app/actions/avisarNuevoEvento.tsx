import sgMail from "@sendgrid/mail";

export default async function AvisarNuevoEvento(correoEncargado: string, nombreEvento: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
        to: correoEncargado,
        from: 'tecnologia_hux@hotmail.com',
        html: `<h1>Se ha creado un nuevo evento</h1>
        <p>El evento ${nombreEvento} ha sido creado</p>`
    }

    sgMail.send(msg)
    .then((res) => {
        console.log("Todo salio bien", res)
    })
    .catch((e) => {
        console.error("Ocurrio un error al avisar el nuevo evento", e)
    })
}