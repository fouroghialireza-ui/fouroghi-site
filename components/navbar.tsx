'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe2, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { copy, localized, type Locale } from '@/lib/content';
import { Arrow, Brand } from './ui';

export function Navbar({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const words = copy[lang];
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 22);
    sync(); window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);
  const links = ['/', '/about-me', '/services'].map((path, i) => <Link key={path} href={localized(lang, path)} aria-current={pathname === path ? 'page' : undefined} onClick={() => setOpen(false)}>{words.nav[i]}</Link>);
  return <header className="site-nav" data-solid={scrolled || open} onKeyDown={e => { if (e.key === 'Escape' && open) { setOpen(false); menu.current?.focus(); } }}>
    <div className="shell nav-inner">
      <Brand lang={lang}/>
      <nav className="nav-links hidden md:flex" aria-label={lang === 'fa' ? 'منوی اصلی' : 'Main navigation'}>{links}</nav>
      <div className="flex items-center gap-2.5 sm:gap-4">
        <a href={localized(lang === 'fa' ? 'en' : 'fa', pathname)} hrefLang={lang === 'fa' ? 'en' : 'fa'} lang={lang === 'fa' ? 'en' : 'fa'} className="lang-link" aria-label={lang === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی'}><Globe2 size={16}/>{lang === 'fa' ? 'EN' : 'فا'}</a>
        <Link href={localized(lang, '/#contact')} className="button button-nav !hidden md:!inline-flex">{words.start}<Arrow lang={lang} size={15}/></Link>
        <button type="button" ref={menu} className="menu-btn md:!hidden" aria-controls="mobile-menu" aria-expanded={open} aria-label={lang === 'fa' ? 'منوی اصلی' : 'Main navigation'} onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
      </div>
    </div>
    <nav id="mobile-menu" hidden={!open} className="mobile-menu md:!hidden" aria-label={lang === 'fa' ? 'منوی موبایل' : 'Mobile navigation'}><div className="shell">{links}<Link href={localized(lang, '/#contact')} onClick={() => setOpen(false)}>{words.start}</Link></div></nav>
  </header>;
}
