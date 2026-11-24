import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CalendarDays, Inbox, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Kicker } from '@/components/ui';
import { LogoutButton } from '@/components/logout-button';
import { cookieName, verifySession } from '@/lib/auth';
import { localized, services } from '@/lib/content';
import { inquirySummary } from '@/lib/db';
import { getLocale } from '@/lib/locale-server';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function Admin() {
  const lang = await getLocale(), fa = lang === 'fa';
  if (!(await verifySession((await cookies()).get(cookieName)?.value))) redirect(localized(lang, '/login'));
  const summary = inquirySummary();
  const date = new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Tehran' });
  const number = new Intl.NumberFormat(lang);
  const stats = [[Inbox, fa ? 'همهٔ درخواست‌ها' : 'Total inquiries', number.format(summary.total)], [CalendarDays, fa ? '۷ روز اخیر' : 'Past 7 days', number.format(summary.week)], [ShieldCheck, fa ? 'وضعیت حساب' : 'Account status', fa ? 'وارد شده‌اید' : 'Signed in']] as const;
  return <><Navbar lang={lang}/><main id="main" className="shell inner-page"><header className="split-head admin-head"><div><Kicker>{fa ? 'فضای مدیریت' : 'Admin workspace'}</Kicker><h1 className="page-title">{fa ? 'داشبورد' : 'Dashboard'}<span className="text-accent">.</span></h1></div><LogoutButton lang={lang}/></header>
    <div className="service-grid">{stats.map(([Icon,label,value]) => <article className="surface stat" key={label}><Icon size={22}/><h2>{label}</h2><p>{value}</p></article>)}</div>
    <section className="surface recent"><h2>{fa ? 'درخواست‌های اخیر' : 'Recent inquiries'}</h2>{summary.recent.length === 0 ? <p className="empty">{fa ? 'هنوز درخواستی ثبت نشده. پیام‌های فرم تماس اینجا نمایش داده می‌شوند.' : 'No inquiries yet. Messages sent through the contact form will appear here.'}</p> : <ul>{summary.recent.map(item => <li key={item.id}><details><summary><div><strong dir="auto">{item.name}</strong><span>{services.find(s => s.id === item.service)?.[lang].title ?? (fa ? 'سایر' : 'Other')}</span></div><time dateTime={new Date(item.created_at).toISOString()}>{date.format(item.created_at)}</time></summary><div className="inquiry-body"><a href={`mailto:${encodeURIComponent(item.email)}`} dir="ltr">{item.email}</a><p dir="auto">{item.message}</p></div></details></li>)}</ul>}</section>
  </main></>;
}
