import { headers } from 'next/headers';

export type Locale = 'fa' | 'en';
export async function getLocale(): Promise<Locale> {
  return (await headers()).get('x-plety-locale') === 'en' ? 'en' : 'fa';
}
