import { redirect } from 'next/navigation';
import { localized } from '@/lib/content';
import { getLocale } from '@/lib/locale-server';

export default async function DashboardAlias() { redirect(localized(await getLocale(), '/admin')); }
