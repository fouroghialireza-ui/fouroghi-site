import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { LoginForm } from '@/components/login-form';
import { cookieName, verifySession } from '@/lib/auth';
import { localized } from '@/lib/content';
import { getLocale } from '@/lib/locale-server';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function Login() {
  const lang = await getLocale(), fa = lang === 'fa';
  if (await verifySession((await cookies()).get(cookieName)?.value)) redirect(localized(lang, '/admin'));
  return <><Navbar lang={lang}/><main id="main" className="login-stage"><section className="login-card"><div className="login-emblem"><LockKeyhole size={23}/></div><h1>{fa ? 'ورود مدیر' : 'Admin sign in'}</h1><p>{fa ? 'برای دسترسی به داشبورد Plety وارد شو.' : 'Sign in to access the Plety dashboard.'}</p><LoginForm lang={lang}/></section></main></>;
}
