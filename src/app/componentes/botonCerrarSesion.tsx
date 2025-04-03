"use client";

import { cerrarSesion } from '@/app/actions/cerrarSesion';
import React from 'react';

function BotonCerrarSesion() {
  return (
    <button onClick={cerrarSesion} className='botonCerrarSesion'>
      Cerrar Sesión
    </button>
  );
}

export default BotonCerrarSesion;
