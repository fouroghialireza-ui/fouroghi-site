import { cookieName, cookieOptions } from '@/lib/auth';
import { reply, sameOrigin } from '@/lib/http';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, 'origin');
  const response = reply(200, 'ok');
  response.cookies.set(cookieName, '', { ...cookieOptions, maxAge: 0, expires: new Date(0) });
  return response;
}
