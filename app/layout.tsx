import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale-server';
import { MotionProvider } from '@/components/motion';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Plety — علیرضا فروغی', template: '%s | Plety' },
  description: 'استودیوی مستقل علیرضا فروغی برای طراحی سایت، تولید تصویر و ویدیو با هوش مصنوعی.',
  icons: { icon: '/images/mark.svg' }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLocale();
  return <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}><body className="bg-black font-vazirmatn text-white antialiased"><a className="skip" href="#main">{lang === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to content'}</a><MotionProvider>{children}</MotionProvider></body></html>;
}
