'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { copy, type Locale } from '@/lib/content';
import { Kicker } from './ui';

export function FAQ({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState<number | null>(null);
  const t = copy[lang];
  return <section className="shell section-pad faq-section" id="faq" aria-labelledby="faq-title"><div className="section-head"><Kicker>{t.faqLabel}</Kicker><h2 id="faq-title">{t.faqTitle}<span className="text-accent">.</span></h2></div>
    <div className="faq-list rounded-xl border border-white/10">
      {t.faq.map(([q, answer], i) => <div className="faq-item" key={q} data-open={open === i}>
        <h3><button type="button" id={`question-${i}`} aria-expanded={open === i} aria-controls={`answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{q}</span><Plus size={20} aria-hidden="true"/></button></h3>
        <div role="region" id={`answer-${i}`} aria-labelledby={`question-${i}`} aria-hidden={open !== i} className="faq-answer"><div><p>{answer}</p></div></div>
      </div>)}
    </div>
  </section>;
}
