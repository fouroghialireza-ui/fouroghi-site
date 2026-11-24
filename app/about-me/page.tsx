import type { Metadata } from 'next';
import Link from 'next/link';
import { Braces, Clapperboard, ImagePlus, Workflow } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Arrow, Kicker, Mark } from '@/components/ui';
import { copy, localized } from '@/lib/content';
import { getLocale } from '@/lib/locale-server';

export async function generateMetadata(): Promise<Metadata> { return { title: (await getLocale()) === 'fa' ? 'درباره علیرضا فروغی' : 'About Alireza Foroughi' }; }

export default async function About() {
  const lang = await getLocale(), fa = lang === 'fa';
  const skills = fa ? ['توسعه و طراحی وب', 'تصویرسازی مولد', 'ویدیو و روایت تصویری', 'گردش‌کار هوش مصنوعی'] : ['Web design & development', 'Generative imagery', 'Video & storytelling', 'AI workflows'];
  const icons = [Braces, ImagePlus, Clapperboard, Workflow];
  return <><Navbar lang={lang}/><main id="main" className="shell inner-page"><div className="about-grid"><div><Kicker>{fa ? 'پشت صحنهٔ Plety' : 'Behind Plety'}</Kicker><h1 className="page-title">{fa ? 'علیرضا فروغی' : 'Alireza Foroughi'}<span className="text-accent">.</span></h1><p className="lead">{fa ? 'متخصص هوش مصنوعی، طراح وب‌سایت و تولیدکنندهٔ محتوای حرفه‌ای با هوش مصنوعی. متولد ۱۳۸۶.' : 'AI specialist, web designer and generative content creator. Born in 1386 on the Solar Hijri calendar.'}</p><p className="body-copy">{fa ? 'در Plety طراحی رابط کاربری، توسعهٔ وب و ساخت تصویر و ویدیو را کنار هم آورده‌ام. برای من یک پروژه از شناخت مخاطب و کاربرد واقعی شروع می‌شود: سایت قرار است چه کاری برای کاربر آسان‌تر کند؟ تصویر یا ویدیو باید چه چیزی را منتقل کند؟ جواب این سؤال‌ها مسیر طراحی را مشخص می‌کند.' : 'Plety is where I bring together interface design, web development, and image and video production. I start by asking what the site should make easier for its visitors, and what the media needs to communicate. Those answers guide the design.'}</p><div className="action-row !justify-start"><Link className="button button-primary" href={localized(lang, '/#contact')}>{copy[lang].start}<Arrow lang={lang}/></Link><Link className="button button-ghost" href={localized(lang, '/services')}>{copy[lang].explore}</Link></div></div><div className="about-art" role="img" aria-label={fa ? 'طرح انتزاعی استودیوی Plety' : 'Abstract Plety studio artwork'}><Mark/><div dir="ltr"><strong>AF / PLETY</strong><span>INDEPENDENT AI STUDIO</span></div></div></div>
    <section className="section-pad"><div className="section-head"><Kicker>{fa ? 'مهارت‌ها' : 'Skills'}</Kicker><h2>{fa ? 'از طراحی تا تولید' : 'From design to production'}</h2></div><div className="skill-grid">{skills.map((skill,i) => {const Icon = icons[i]; return <div className="surface skill" key={skill}><Icon size={23}/><h3>{skill}</h3></div>;})}</div></section>
  </main><Footer lang={lang}/></>;
}
