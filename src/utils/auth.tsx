// ...existing code...
import { importJWK, SignJWT, jwtVerify } from 'jose';
// ...existing code...

const secret = new TextEncoder().encode(process.env.SECRETO_JWT);
const jwk = {
  kty: 'oct',
  k: Buffer.from(secret).toString('base64'),
};
const key = await importJWK(jwk, 'HS256');

export async function encriptar(payload: {usuario: string}) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export default async function desencriptar(sesion: string) {
  return await jwtVerify(sesion, key);
}

// ...existing code...