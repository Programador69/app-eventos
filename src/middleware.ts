// import { NextRequest, NextResponse } from "next/server"

// export function middleware(request: NextRequest) {    
//     console.log("Middleware funcionando")
    
//     if (request.cookies.has("sesion")) {
//         return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//     matcher: '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
// }

import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    // Evitar ejecutar el middleware en recursos estáticos
    if (
        request.nextUrl.pathname.startsWith('/_next') || 
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }
    
    // Verificar si la página actual ya es la página de inicio
    if (request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }
    
    // Verificar la cookie de sesión
    const sesionCookie = request.cookies.get("sesion");
    if (sesionCookie?.value) {
        return NextResponse.next();
    }

    // Redirigir a la página principal si no hay sesión
    return NextResponse.redirect(new URL("/", request.url));
}

// Matcher más específico para rutas que quieres proteger
export const config = {
    matcher: [
        // Rutas que quieres proteger
        '/buscar-codigo/:path*',
        '/consultar-evento/:path*',
        '/consultar-fechas/:path*',
        '/crear-evento/:path*',
        '/eliminar-evento/:path*',
        '/eliminar-invitado/:path*',
        '/eventos/:path*',
        '/invitados/:path*',
        '/leer-qr/:path*',
        '/modificar-evento/:path*',
        '/modificar-invitado/:path*',
        '/nuevo-invitado/:path*',
        // Otras rutas protegidas
    ],
}