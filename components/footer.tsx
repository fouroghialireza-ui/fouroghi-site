import Link from 'next/link';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { copy, localized, media, services, type Locale } from '@/lib/content';
import { Arrow, Brand, Kicker } from './ui';
import { VideoBackdrop } from './motion';
import { InquiryForm } from './inquiry-form';

export function Footer({ lang, landing = false }: { lang: Locale; landing?: boolean }) {
  const t = copy[lang];
  return <footer className="site-footer">
    {landing && <><section className="footer-cta"><VideoBackdrop src={media.hero} poster="/images/hero.svg"/><div className="cta-shade"/><div className="shell text-center"><Kicker>{lang === 'fa' ? 'گام بعدی' : 'Next step'}</Kicker><h2>{t.cta}</h2><p>{t.ctaText}</p><div className="action-row"><Link className="button button-primary" href={localized(lang, '/#contact')}>{t.start}<Arrow lang={lang}/></Link><Link className="button button-ghost" href={localized(lang, '/services')}>{t.explore}</Link></div></div></section>
    <section id="contact" className="shell contact" aria-labelledby="contact-title"><div><Kicker>{t.contact}</Kicker><h2 id="contact-title">{lang === 'fa' ? 'دربارهٔ پروژه‌ات بگو.' : 'Tell me about your project.'}</h2></div><InquiryForm lang={lang}/></section></>}
    <div className="shell footer-main"><div className="footer-grid"><div><Brand lang={lang}/><p>{t.footerBlurb}</p></div><div><h2>{t.footerGroups[0]}</h2>{['/', '/about-me', '/services'].map((p, i) => <Link key={p} href={localized(lang,p)}>{t.nav[i]}</Link>)}</div><div><h2>{t.footerGroups[1]}</h2>{services.map(s => <Link key={s.id} href={localized(lang, `/services#${s.id}`)}>{s[lang].title}</Link>)}</div><div><h2>{t.footerGroups[2]}</h2><Link href={localized(lang, '/#contact')}>{t.contact}<ArrowUpRight size={14}/></Link><Link href={localized(lang, '/login')}><LockKeyhole size={13}/>{t.admin}</Link></div></div><div className="footer-bottom"><span>{t.rights}</span><span dir="ltr">PLETY / STUDIO</span></div></div>
  </footer>;
}
