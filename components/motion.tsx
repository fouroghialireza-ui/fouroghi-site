'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Locale } from '@/lib/content';

const Motion = createContext({ paused: true, toggle: () => {} });
export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(true);
  const [manual, setManual] = useState<boolean | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setReduced(media.matches);
    check();
    media.addEventListener('change', check);
    return () => media.removeEventListener('change', check);
  }, []);
  const paused = manual ?? reduced;
  return <Motion.Provider value={{ paused, toggle: () => setManual(!paused) }}><div data-motion={paused ? 'paused' : 'playing'}>{children}</div></Motion.Provider>;
}
export function MotionButton({ lang }: { lang: Locale }) {
  const { paused, toggle } = useContext(Motion);
  const label = lang === 'fa' ? (paused ? 'پخش جلوه‌های متحرک' : 'توقف جلوه‌های متحرک') : (paused ? 'Play motion effects' : 'Pause motion effects');
  return <button type="button" className="motion-btn" aria-label={label} title={label} onClick={toggle}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>;
}
export function VideoBackdrop({ src, poster, priority = false }: { src: string; poster: string; priority?: boolean }) {
  const { paused } = useContext(Motion);
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(priority);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (paused || !visible) el.pause();
    else { if (!el.hasAttribute('src')) el.src = src; void el.play().catch(() => {}); }
  }, [paused, visible, src]);
  return <video ref={ref} aria-hidden="true" tabIndex={-1} poster={poster} muted loop playsInline preload="none" className="backdrop-video"/>;
}
