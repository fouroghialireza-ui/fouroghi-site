import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import bcrypt from 'bcryptjs';

const [, , username = 'alireza', address = 'http://localhost:3000'] = process.argv;
if (!/^[a-zA-Z0-9_.-]{1,64}$/.test(username)) throw new Error('Use 1–64 letters, digits, dots, hyphens or underscores.');
const url = new URL(address);
if (url.origin !== address || !(url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))) throw new Error('Supply an HTTPS origin without a trailing slash (HTTP only for localhost).');
const password = randomBytes(24).toString('base64url');
const hash = (await bcrypt.hash(password, 12)).replaceAll('$', '\\$');
const secret = randomBytes(48).toString('base64url');
writeFileSync('.env.local', `APP_ORIGIN=${address}\nADMIN_USERNAME=${username}\nADMIN_PASSWORD_HASH=${hash}\nJWT_SECRET=${secret}\n`, { flag: 'wx', mode: 0o600 });
console.log(`Created .env.local. Save these credentials in a password manager.\nUsername: ${username}\nPassword: ${password}`);
