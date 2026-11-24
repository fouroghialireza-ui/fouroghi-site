import bcrypt from 'bcryptjs';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cookieName, cookieOptions, signSession } from '@/lib/auth';
import { takeAttempt } from '@/lib/db';
import { byteLength, readJson, reply, sameOrigin } from '@/lib/http';

export const runtime = 'nodejs';
const digest = (text: string) => createHash('sha256').update(text).digest();

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, 'origin');
  const data = await readJson(request, 2048);
  const username = typeof data?.username === 'string' ? data.username.trim() : '';
  const password = typeof data?.password === 'string' ? data.password : '';
  if (!username || byteLength(username) > 128 || !password || byteLength(password) > 72) return reply(400, 'validation');
  const admin = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!admin || !hash || !/^\$2[aby]\$(?:1[2-5])\$[./A-Za-z0-9]{53}$/.test(hash)) return reply(503, 'unavailable');
  try {
    const retry = takeAttempt('login', 8, 600);
    if (retry) return reply(429, 'limited', retry);
    const validUser = timingSafeEqual(digest(username), digest(admin));
    const validPassword = await bcrypt.compare(password, hash);
    if (!validUser || !validPassword) return reply(401, 'credentials');
    const response = reply(200, 'ok');
    response.cookies.set(cookieName, await signSession(), cookieOptions);
    return response;
  } catch (error) { console.error('Login service failed', error); return reply(503, 'unavailable'); }
}
