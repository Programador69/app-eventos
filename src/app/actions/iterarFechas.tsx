import FechasOcupadas from "./fechasOcupadas";

export default async function IterarFechas() {
    const fechas = [];
    const fechasOcupadas = await FechasOcupadas();
  
    const hoy = new Date();
    const actualYear = hoy.toISOString().slice(0, 4);
  
    const newYear = parseInt(actualYear, 10) + 1;
    const nuevoHoy = new Date();
    nuevoHoy.setFullYear(newYear);
  
    while (hoy <= nuevoHoy) {
      if(fechasOcupadas.includes(hoy.toISOString().slice(0, 10))) {
        fechas.push({fecha: hoy.toISOString().slice(0, 10), ocupado: true});
      }
      else {
        fechas.push({fecha: hoy.toISOString().slice(0, 10), ocupado: false});
      }
  
      hoy.setDate(hoy.getDate() + 1);
    }
  
    return fechas
}