import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { localized, type Locale } from '@/lib/content';

export function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} aria-hidden="true" width="33" height="33" viewBox="0 0 32 32" fill="none"><path d="M16 2.5 28.15 9.5v13L16 29.5l-12.15-7v-13L16 2.5Z M4.1 9.6 16 16.5l12-6.9M16 16.5v12.7M10 6l12 6.9v6.4l-6 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/></svg>;
}
export function Brand({ lang }: { lang: Locale }) {
  return <Link href={localized(lang, '/')} className="inline-flex items-center gap-2.5" dir="ltr" aria-label="Plety — Home"><Mark className="text-accent"/><span className="text-[25px] font-black tracking-tight">Plety<span className="text-accent">.</span></span></Link>;
}
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge"><Sparkles size={14} aria-hidden="true"/>{children}</span>;
}
export function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="kicker"><i aria-hidden="true"/>{children}</span>;
}
export function Arrow({ lang, size = 17 }: { lang: Locale; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={lang === 'fa' ? 'rotate-180' : ''}><path d="M5 12h14m-7-7 7 7-7 7"/></svg>;
}
