"use server";
import xlsx from "node-xlsx";

export async function lecturaArchivo(datosBinarios: string | ArrayBuffer | null | undefined) {
    try {
        const hojasDeTrabajo = xlsx.parse(datosBinarios);

        let datosExtraidos: unknown[][] = [];
    
        hojasDeTrabajo.forEach((hoja) => {
            // checar que saca y despues ver como acceder a cada dato para poder maneajrlo individualmente
            // console.log(hoja.name);
            // console.log(hoja.data);
            datosExtraidos = hoja.data;
        });

        return datosExtraidos;

    }catch (error)  {
        console.error("Error leyendo el archivo:", error);
    }

  }