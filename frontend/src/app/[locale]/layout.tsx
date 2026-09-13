import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getGlobal } from '@/lib/strapi';
import '../globals.css';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) notFound();

    // Enable static rendering
    setRequestLocale(locale);

    // Fetch translations for client components (still needed for LanguageSwitcher etc.)
    const messages = await getMessages();

    // Fetch site-wide Strapi data (header nav, footer columns, branding)
    let globalData = null;
    try {
        globalData = await getGlobal(locale);
    } catch (e) {
        // Strapi may not be running during initial dev — degrade gracefully
        console.warn('[layout] Could not fetch global data from Strapi:', e);
    }

    return (
        <html lang={locale}>
            <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
                <NextIntlClientProvider messages={messages}>
                    <Header
                        navItems={globalData?.headerNav ?? []}
                        logo={globalData?.logo ?? null}
                        siteName={globalData?.siteName}
                    />
                    <div className="flex-1">
                        {children}
                    </div>
                    <Footer
                        columns={globalData?.footerColumns ?? []}
                        copyright={globalData?.copyright}
                        socialLinks={globalData?.socialLinks ?? []}
                    />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}