"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function cerrarSesion() {
    (await cookies()).delete("sesion");

    redirect("/");
}