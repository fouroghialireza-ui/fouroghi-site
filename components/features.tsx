import Link from 'next/link';
import { ArrowUpRight, AudioLines, Check, CirclePlay, Code2, Image, Mic, Sparkles, WandSparkles } from 'lucide-react';
import { copy, localized, media, services, type Locale } from '@/lib/content';
import { Arrow, Badge, Kicker } from './ui';
import { VideoBackdrop } from './motion';

export function Features({ lang }: { lang: Locale }) {
  const t = copy[lang], fa = lang === 'fa';
  const waves = [10, 18, 14, 27, 16, 33, 21, 39, 26, 48, 32, 53, 41, 57, 35, 45, 22, 36, 17, 24, 13, 26, 18, 10];
  return <section className="shell section-pad capabilities" aria-label={t.studio}>
    <article className="feature"><div className="feature-copy"><Badge>{t.chatBadge}</Badge><h2>{t.chatTitle}</h2><p>{t.chatText}</p><Link className="button button-ghost" href={localized(lang, '/services#web')}>{t.chatBtn}<Arrow lang={lang}/></Link></div>
      <div className="feature-visual rounded-3xl" aria-hidden="true"><VideoBackdrop src={media.web} poster="/images/grid.svg"/><div className="visual-shade"/><div className="visual-index" dir="ltr"><span/>01 / WEB LAB</div>
        <div className="mock-card bg-[#1C1C1E]/90 backdrop-blur-xl"><div className="mock-head"><div className="mock-icon"><Sparkles size={17}/></div><div><strong>{fa ? 'دستیار طراحی Plety' : 'Plety design assistant'}</strong><small>{fa ? 'نمونهٔ رابط کاربری' : 'Interface concept'}</small></div><Code2 className="ms-auto text-white/40" size={18}/></div><p className="mock-query">{fa ? 'یک صفحهٔ معرفی برای استودیوی من طراحی کن.' : 'Design a landing page for my studio.'}</p><div className="mock-result"><Check size={15}/>{fa ? 'ساختار اولیه آماده است.' : 'Page structure is ready.'}</div><div className="mock-lines"><i/><i/></div></div>
      </div>
    </article>
    <article className="feature feature-reverse"><div className="feature-copy"><Badge>{t.mediaBadge}</Badge><h2>{t.mediaTitle}</h2><p>{t.mediaText}</p><Link className="button button-ghost" href={localized(lang, '/services#image')}>{t.mediaBtn}<Arrow lang={lang}/></Link></div>
      <div className="feature-visual rounded-3xl" aria-hidden="true"><VideoBackdrop src={media.media} poster="/images/pulse.svg"/><div className="visual-shade"/><div className="visual-index" dir="ltr"><span/>02 / MEDIA LAB</div>
        <div className="mock-card bg-[#1C1C1E]/90 backdrop-blur-xl"><div className="mock-head"><div className="mock-icon"><Mic size={17}/></div><div><strong>{fa ? 'استودیوی صدا' : 'Voice studio'}</strong><small>{fa ? 'تبدیل گفتار به متن' : 'Speech to text'}</small></div><AudioLines className="ms-auto text-white/40" size={18}/></div><div className="wave" dir="ltr">{waves.map((height, i) => <i className="animate-breathe" key={i} style={{ height: `${height}px`, animationDelay: `${i * -90}ms` }}/>)}</div><div className="mock-time" dir="ltr"><CirclePlay size={19}/><span>00:18 / 00:42</span><span className="ms-auto">.WAV</span></div></div>
      </div>
    </article>
  </section>;
}
export function ServicePreview({ lang }: { lang: Locale }) {
  const icons = [Code2, Image, WandSparkles];
  return <section className="shell section-pad" aria-labelledby="preview-title"><div className="section-head split-head"><div><Kicker>{copy[lang].studio}</Kicker><h2 id="preview-title">{lang === 'fa' ? 'برای ایده‌ات چه می‌سازم؟' : 'What can we make?'}</h2></div><Link className="button button-ghost" href={localized(lang, '/services')}>{copy[lang].explore}<Arrow lang={lang}/></Link></div>
    <div className="service-grid">{services.map((service, i) => { const Icon = icons[i]; return <Link className="service-tile" key={service.id} href={localized(lang, `/services#${service.id}`)}><div className="service-art" style={{ backgroundImage: `url(/images/${service.art}.svg)` }} aria-hidden="true"/><div className="service-body"><span className="service-icon"><Icon size={18}/></span><ArrowUpRight className="tile-arrow" size={19} aria-hidden="true"/><h3>{service[lang].title}</h3><p>{service[lang].short}</p></div></Link>; })}</div>
  </section>;
}
