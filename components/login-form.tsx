'use client';

import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { localized, type Locale } from '@/lib/content';
import { Arrow } from './ui';

export function LoginForm({ lang }: { lang: Locale }) {
  const fa = lang === 'fa';
  const [busy, setBusy] = useState(false), [shown, setShown] = useState(false), [error, setError] = useState('');
  const messages = fa ? ['نام کاربری و رمز عبور معتبر وارد کن.', 'نام کاربری یا رمز عبور اشتباه است.', 'تعداد تلاش‌ها بیش از حد است. چند دقیقه دیگر امتحان کن.', 'ورود موقتاً ممکن نیست. دوباره امتحان کن.'] : ['Enter a valid username and password.', 'Incorrect username or password.', 'Too many attempts. Try again in a few minutes.', 'Login is unavailable. Please try again.'];
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget), username = String(data.get('username') || '').trim(), password = String(data.get('password') || '');
    if (!username || new TextEncoder().encode(username).length > 128 || !password || new TextEncoder().encode(password).length > 72) { setError(messages[0]); return; }
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      if (response.ok) { window.location.replace(localized(lang, '/admin')); return; }
      setError(messages[response.status === 400 ? 0 : response.status === 401 ? 1 : response.status === 429 ? 2 : 3]);
    } catch { setError(messages[3]); }
    setBusy(false);
  }
  return <form className="login-form" action="/api/auth/login" method="post" onSubmit={submit} aria-busy={busy}>
    <label>{fa ? 'نام کاربری' : 'Username'}<input name="username" required maxLength={128} autoComplete="username" autoCapitalize="none" spellCheck={false} dir="ltr"/></label>
    <label htmlFor="login-password">{fa ? 'رمز عبور' : 'Password'}</label><div className="password-wrap"><input id="login-password" name="password" type={shown ? 'text' : 'password'} required maxLength={72} autoComplete="current-password" dir="ltr"/><button type="button" onClick={() => setShown(!shown)} aria-label={fa ? (shown ? 'پنهان کردن رمز' : 'نمایش رمز') : (shown ? 'Hide password' : 'Show password')}>{shown ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="button button-primary mt-2 w-full" disabled={busy} type="submit">{busy && <LoaderCircle className="animate-spin" size={17}/>} {busy ? (fa ? 'در حال ورود…' : 'Signing in…') : (fa ? 'ورود به داشبورد' : 'Sign in')}{!busy && <Arrow lang={lang}/>}</button>
  </form>;
}
