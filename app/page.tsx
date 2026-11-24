import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { MotionButton, VideoBackdrop } from '@/components/motion';
import { Arrow, Badge } from '@/components/ui';
import { Features, ServicePreview } from '@/components/features';
import { Marquee } from '@/components/marquee';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';
import { copy, localized, media } from '@/lib/content';
import { getLocale } from '@/lib/locale-server';

export default async function Home() {
  const lang = await getLocale();
  const t = copy[lang];
  return <><Navbar lang={lang}/><main id="main"><section className="hero" aria-labelledby="hero-title"><VideoBackdrop priority src={media.hero} poster="/images/hero.svg"/><div className="hero-shade"/><div className="hero-grid" aria-hidden="true"/>
    <div className="shell hero-inner animate-fade-in-up"><Badge>{t.announcement}</Badge><h1 id="hero-title">{t.hero}<br/>{t.heroLine} <em>{t.heroAccent}</em></h1><p className="max-w-2xl text-base text-gray-400">{t.intro}</p><div className="action-row"><Link className="button button-primary" href={localized(lang, '/#contact')}>{t.start}<Arrow lang={lang}/></Link><Link className="button button-ghost" href={localized(lang, '/services')}>{t.explore}</Link></div></div>
    <div className="shell hero-bottom"><span dir="ltr">PLETY<span className="text-accent"> / </span>INDEPENDENT AI STUDIO</span><a href="#studio" aria-label={lang === 'fa' ? 'مشاهدهٔ توانمندی‌ها' : 'Scroll to capabilities'} className="scroll-cue"><ChevronDown size={17}/></a><MotionButton lang={lang}/></div>
  </section><div id="studio"><Marquee lang={lang}/><Features lang={lang}/><ServicePreview lang={lang}/><FAQ lang={lang}/></div></main><Footer lang={lang} landing/></>;
}
