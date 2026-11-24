import { DatabaseSync } from 'node:sqlite';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

let db: DatabaseSync | undefined;
function database() {
  if (db) return db;
  const file = resolve(process.env.DATABASE_PATH || '.data/plety.sqlite');
  mkdirSync(dirname(file), { recursive: true, mode: 0o700 });
  const connection = new DatabaseSync(file);
  try {
    connection.exec(`PRAGMA busy_timeout=4000; PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS limits (bucket TEXT PRIMARY KEY, hits INTEGER NOT NULL, reset INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, service TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL);`);
  } catch (error) { connection.close(); throw error; }
  return db = connection;
}

export function takeAttempt(bucket: 'login' | 'inquiries', limit: number, windowSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const result = database().prepare(`INSERT INTO limits VALUES (?, 1, ?)
    ON CONFLICT(bucket) DO UPDATE SET
    hits=CASE WHEN reset <= ? THEN 1 ELSE min(hits + 1, ?) END,
    reset=CASE WHEN reset <= ? THEN excluded.reset ELSE reset END
    RETURNING hits, reset`).get(bucket, now + windowSeconds, now, limit + 1, now) as { hits: number; reset: number };
  return result.hits > limit ? Math.max(1, result.reset - now) : 0;
}

export function createInquiry(name: string, email: string, service: string, message: string) {
  database().prepare('INSERT INTO inquiries (name,email,service,message,created_at) VALUES (?,?,?,?,?)').run(name, email, service, message, Date.now());
}

export type Inquiry = { id: number; name: string; email: string; service: string; message: string; created_at: number };
export function inquirySummary() {
  const db = database();
  const total = Number(db.prepare('SELECT count(*) AS count FROM inquiries').get()?.count);
  const week = Number(db.prepare('SELECT count(*) AS count FROM inquiries WHERE created_at >= ?').get(Date.now() - 604800000)?.count);
  const recent = db.prepare('SELECT id,name,email,service,message,created_at FROM inquiries ORDER BY id DESC LIMIT 15').all() as Inquiry[];
  return { total, week, recent };
}
