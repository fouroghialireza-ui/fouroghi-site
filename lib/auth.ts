import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

export const cookieName = 'plety_session';
const maxAge = 2 * 60 * 60;
const issuer = 'plety-studio';
const audience = 'plety-admin';
const signingKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || new TextEncoder().encode(secret).length < 32) throw new Error('JWT_SECRET must contain at least 32 bytes');
  return new TextEncoder().encode(secret);
};

export const cookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge
};

export async function signSession() {
  return new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(issuer).setAudience(audience).setSubject('admin').setIssuedAt().setExpirationTime(`${maxAge}s`).sign(signingKey());
}

export async function verifySession(token?: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, signingKey(), { algorithms: ['HS256'], issuer, audience, requiredClaims: ['exp', 'iat', 'sub'] });
    return payload.sub === 'admin' && payload.role === 'admin';
  } catch { return false; }
}
