'use client';

import { useState } from 'react';
import { LogOut, LoaderCircle } from 'lucide-react';
import { localized, type Locale } from '@/lib/content';

export function LogoutButton({ lang }: { lang: Locale }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState(false);
  const fa = lang === 'fa';
  return <div><button type="button" className="button button-ghost" disabled={busy} onClick={async () => {
    setBusy(true); setError(false);
    try {
      const result = await fetch('/api/auth/logout', { method: 'POST' });
      if (result.ok) { window.location.replace(localized(lang, '/login')); return; }
    } catch { /* Render a localized error below. */ }
    setError(true); setBusy(false);
  }}>{busy ? <LoaderCircle size={17} className="animate-spin"/> : <LogOut size={17}/>} {fa ? 'خروج' : 'Log out'}</button>
  {error && <p role="alert" className="form-error mt-2">{fa ? 'خروج انجام نشد.' : 'Could not log out.'}</p>}</div>;
}
