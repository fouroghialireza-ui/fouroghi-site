import { Asterisk, AudioLines, Box, Braces, Aperture, Layers3, Orbit, Video } from 'lucide-react';
import { copy, type Locale } from '@/lib/content';

const partners = [[Box, 'Next.js'], [Asterisk, 'OpenAI'], [Braces, 'Tailwind'], [Aperture, 'Midjourney'], [Orbit, 'Runway'], [Layers3, 'WordPress'], [AudioLines, 'Whisper'], [Video, 'DaVinci']] as const;
export function Marquee({ lang }: { lang: Locale }) {
  return <section className="shell tools" aria-labelledby="tools-title"><div className="tools-label"><span/><h2 id="tools-title">{copy[lang].stack}</h2><span/></div><div className="marquee-mask" dir="ltr"><div className="marquee-track animate-marquee">{[0, 1].map(group => <ul className="marquee-group" key={group} aria-hidden={group === 1 ? true : undefined}>{partners.map(([Icon, label]) => <li key={label}><Icon size={25} strokeWidth={1.35} aria-hidden="true"/>{label}</li>)}</ul>)}</div></div></section>;
}
