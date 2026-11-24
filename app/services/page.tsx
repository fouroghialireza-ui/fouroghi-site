import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Arrow, Kicker } from '@/components/ui';
import { copy, localized, services } from '@/lib/content';
import { getLocale } from '@/lib/locale-server';

export async function generateMetadata(): Promise<Metadata> { return { title: (await getLocale()) === 'fa' ? 'خدمات' : 'Services' }; }

export default async function Services() {
  const lang = await getLocale(), fa = lang === 'fa';
  return <><Navbar lang={lang}/><main id="main" className="shell inner-page"><header className="page-intro"><Kicker>{copy[lang].studio}</Kicker><h1 className="page-title">{fa ? 'خدمات Plety' : 'Plety services'}<span className="text-accent">.</span></h1><p className="lead">{fa ? 'طراحی سایت، تولید تصویر و ساخت ویدیو؛ هر خدمت را می‌توان جداگانه یا به‌عنوان بخشی از یک پروژه سفارش داد.' : 'Web design, image generation and video production. Commission them individually or as part of one project.'}</p></header><div className="service-details">{services.map((s, i) => <article key={s.id} id={s.id} className="surface detail-card"><div aria-hidden="true" className="detail-art" style={{ backgroundImage: `url(/images/${s.art}.svg)` }}/><div className="detail-copy"><span className="kicker text-accent" dir="ltr">0{i + 1} / {s.id}</span><h2>{s[lang].title}</h2><p className="body-copy">{s[lang].detail}</p><ul>{s[lang].items.map(item => <li key={item}><Check size={17} aria-hidden="true"/>{item}</li>)}</ul><Link className="button button-ghost" href={localized(lang, '/#contact')}>{copy[lang].start}<Arrow lang={lang}/></Link></div></article>)}</div></main><Footer lang={lang}/></>;
}
