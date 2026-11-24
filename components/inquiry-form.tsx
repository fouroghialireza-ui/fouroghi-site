'use client';

import { useState, type FormEvent } from 'react';
import { LoaderCircle, Send } from 'lucide-react';
import { services, type Locale } from '@/lib/content';

const errors = {
  fa: { validation: 'لطفاً اطلاعات را بررسی کن. توضیح پروژه باید حداقل ۱۰ نویسه باشد.', limited: 'درخواست‌ها زیاد شده‌اند. چند دقیقهٔ دیگر دوباره امتحان کن.', fallback: 'ثبت پیام ممکن نشد. لطفاً دوباره امتحان کن.' },
  en: { validation: 'Check your details. The project description must be at least 10 characters.', limited: 'Too many requests. Please try again in a few minutes.', fallback: 'Could not save your inquiry. Please try again.' }
};
export function InquiryForm({ lang }: { lang: Locale }) {
  const fa = lang === 'fa';
  const [busy, setBusy] = useState(false), [status, setStatus] = useState(''), [done, setDone] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget, data = Object.fromEntries(new FormData(form));
    setStatus(''); setDone(false); setBusy(true);
    try {
      const result = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (result.ok) { setDone(true); form.reset(); }
      else setStatus(result.status === 400 ? errors[lang].validation : result.status === 429 ? errors[lang].limited : errors[lang].fallback);
    } catch { setStatus(errors[lang].fallback); } finally { setBusy(false); }
  }
  return <form className="field-grid" action="/api/inquiries" method="post" onSubmit={submit} aria-busy={busy}>
    <label>{fa ? 'نام' : 'Name'}<input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label>
    <label>{fa ? 'ایمیل' : 'Email'}<input name="email" type="email" required maxLength={254} autoComplete="email" dir="ltr"/></label>
    <label className="field-wide">{fa ? 'نوع پروژه' : 'Type of project'}<select required name="service" defaultValue=""><option value="" disabled>{fa ? 'یک گزینه انتخاب کن' : 'Choose a service'}</option>{services.map(s => <option key={s.id} value={s.id}>{s[lang].title}</option>)}<option value="other">{fa ? 'سایر' : 'Other'}</option></select></label>
    <label className="field-wide">{fa ? 'توضیح پروژه' : 'Project description'}<textarea name="message" rows={4} required minLength={10} maxLength={2000} dir="auto"/></label>
    <div hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="field-wide flex flex-wrap items-center gap-4"><button disabled={busy} className="button button-primary" type="submit">{busy ? <LoaderCircle className="animate-spin" size={17}/> : <Send size={16}/>} {fa ? 'ارسال درخواست' : 'Send inquiry'}</button><p className="text-sm text-gray-400">{fa ? 'اطلاعات برای پیگیری همین درخواست در اختیار مدیر سایت قرار می‌گیرد.' : 'Your details are shared with the site admin to follow up on this inquiry.'}</p></div>
    {status && <p className="field-wide form-error" role="alert">{status}</p>}{done && <p className="field-wide form-success" role="status">{fa ? 'درخواستت ثبت شد.' : 'Your inquiry was saved.'}</p>}
  </form>;
}
