import sgMail from "@sendgrid/mail";
import { html } from "../api/templateHtml";
import CreadorQr from "./crearQr";

type DatosInvitado = {
    nombre: string;
    correo: string;
    numAcompanantes: string;
    numMesa: string;
    evento: string;
    mensajeEvento: string;
    fechaEvento: string;
    idEvento: number
}

export async function enviarInvitaciones(datosInvitado: DatosInvitado) {
    const {nombre, correo, numAcompanantes, numMesa, evento, mensajeEvento, fechaEvento, idEvento} = datosInvitado;
    const datosQr = `Nombre: ${nombre}, Acompañantes: ${numAcompanantes}, Mesa: ${numMesa}, Fecha: ${fechaEvento}, Evento: ${evento}`;
    // const qrData = await QRCode.toDataURL(datosQr);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // subir qr a cloudinary y obtener su src
    const linkQr = await CreadorQr(datosQr);

    const plantilla = html({
        nombreEvento: evento,
        nombreInvitado: nombre,
        mensajeInvitados: mensajeEvento,
        fechaEvento,
        numeroAcompanantes: numAcompanantes,
        numeroMesa: numMesa,
        idEvento,
        qrDataUrl: linkQr
    })

    const msg = {
        to: correo,
        from: 'tecnologia_hux@hotmail.com', 
        subject: 'Invitacion',
        html: plantilla
    }

    sgMail.send(msg)
    .then((res) => {
        console.log("Todo salio bien", res)
    })
    .catch((e) => {
        console.error("Ocurrio un error al enviar invitaciones", e)
    })

}