import { NextResponse } from 'next/server';

export function reply(status: number, code: string, retry?: number) {
  return NextResponse.json({ ok: status < 300, code }, { status, headers: { 'Cache-Control': 'no-store', ...(retry ? { 'Retry-After': String(retry) } : {}) } });
}
export function sameOrigin(request: Request) {
  try {
    const origin = new URL(process.env.APP_ORIGIN || '');
    const local = origin.hostname === 'localhost' || origin.hostname === '127.0.0.1' || origin.hostname === '[::1]';
    return (origin.protocol === 'https:' || (origin.protocol === 'http:' && local)) && request.headers.get('origin') === origin.origin;
  } catch { return false; }
}
export async function readJson(request: Request, limit: number): Promise<Record<string, unknown> | null> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return null;
  if (Number(request.headers.get('content-length')) > limit || !request.body) return null;
  const reader = request.body.getReader();
  try {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    const json: unknown = JSON.parse(Buffer.concat(chunks, size).toString('utf8'));
    return json && typeof json === 'object' && !Array.isArray(json) ? json as Record<string, unknown> : null;
  } catch { return null; } finally { reader.releaseLock(); }
}
export const byteLength = (text: string) => Buffer.byteLength(text, 'utf8');
