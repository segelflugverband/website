import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getPage, getAllPages } from '@/lib/strapi';
import BlockRenderer from '@/components/BlockRenderer';
import PageContainer from '@/components/ui/PageContainer';

interface PageParams {
    locale: string;
    slug?: string[];
}

// ─────────────────────────────────────────────────────────────
// Static generation — pre-render all Strapi pages at build time
// ─────────────────────────────────────────────────────────────

export async function generateStaticParams(): Promise<PageParams[]> {
    try {
        const pages = await getAllPages();

        return pages.map(({ slug, locale }) => ({
            locale,
            // The homepage has slug 'home' — map it to an empty array so Next.js
            // renders it at /[locale]/ (root). All other slugs split on '/'.
            slug: slug === 'home' ? [] : slug.split('/'),
        }));
    } catch (e) {
        console.warn('[generateStaticParams] Could not fetch pages from Strapi:', e);
        return [];
    }
}

// ─────────────────────────────────────────────────────────────
// SEO metadata
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    // Map empty array (root) back to 'home' for Strapi query
    const slugString = (!slug || slug.length === 0) ? 'home' : slug.join('/');
    const page = await getPage(slugString, locale);

    if (!page) return {};

    return {
        title: page.seo?.metaTitle ?? page.title,
        description: page.seo?.metaDescription,
        openGraph: page.seo?.ogImage
            ? { images: [{ url: page.seo.ogImage.url }] }
            : undefined,
    };
}

// ─────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────

export default async function CmsPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { locale, slug } = await params;

    // Enable static rendering for this locale
    setRequestLocale(locale);

    // Map empty array (root) back to 'home' for Strapi query
    const slugString = (!slug || slug.length === 0) ? 'home' : slug.join('/');

    const page = await getPage(slugString, locale);

    if (!page) notFound();

    return (
        <PageContainer>
            <BlockRenderer blocks={page.blocks} />
        </PageContainer>
    );
}
