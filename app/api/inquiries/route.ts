import { createInquiry, takeAttempt } from '@/lib/db';
import { readJson, reply, sameOrigin } from '@/lib/http';

export const runtime = 'nodejs';
const choices = new Set(['web', 'image', 'video', 'other']);
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, 'origin');
  const input = await readJson(request, 16384);
  if (!input) return reply(400, 'validation');
  const field = (key: string) => typeof input[key] === 'string' ? input[key].trim() : '';
  // Simple honeypot, separate from the visible form fields.
  if (field('website')) return reply(201, 'ok');
  const [name, email, service, message] = ['name', 'email', 'service', 'message'].map(field);
  if (name.length < 2 || name.length > 80 || email.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email) || !choices.has(service) || message.length < 10 || message.length > 2000) return reply(400, 'validation');
  try {
    const retry = takeAttempt('inquiries', 24, 600);
    if (retry) return reply(429, 'limited', retry);
    createInquiry(name, email, service, message);
    return reply(201, 'ok');
  } catch (error) { console.error('Inquiry service failed', error); return reply(503, 'unavailable'); }
}
