import type {
  GlobalData,
  PageData,
  NewsArticle,
  StrapiSingleResponse,
  StrapiListResponse,
} from '@/types/strapi';

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

// ─────────────────────────────────────────────────────────────
// Base fetcher
// ─────────────────────────────────────────────────────────────

async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate: number | false = 60
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: revalidate === false ? { cache: 'no-store' } : { revalidate },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`[Strapi Fetch Error] URL: ${url.toString()}`);
    console.error(`[Strapi Fetch Error] Body:`, errorBody);
    throw new Error(
      `Strapi fetch failed: ${res.status} ${res.statusText} — ${url.toString()}\nDetails: ${errorBody}`
    );
  }

  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────────────────────
// Helper: resolve Strapi media URL to an absolute URL
// ─────────────────────────────────────────────────────────────

export function getStrapiMediaUrl(relativeUrl: string | null | undefined): string {
  if (!relativeUrl) return '';
  if (relativeUrl.startsWith('http')) return relativeUrl;
  return `${STRAPI_URL}${relativeUrl}`;
}

// ─────────────────────────────────────────────────────────────
// Global (header nav, footer, branding)
// ─────────────────────────────────────────────────────────────

export async function getGlobal(locale: string): Promise<GlobalData> {
  const data = await fetchStrapi<StrapiSingleResponse<GlobalData>>(
    '/global',
    {
      locale,
      'populate[logo]': 'true',
      'populate[headerNav][populate]': '*',
      'populate[footerColumns][populate][links]': '*',
      'populate[socialLinks]': '*',
    }
  );
  return data.data;
}

// ─────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────

/**
 * Fetch a single page by its locale-specific slug.
 * Returns null if not found (use for notFound() handling).
 */
export async function getPage(
  slug: string,
  locale: string
): Promise<PageData | null> {
  try {
    const data = await fetchStrapi<StrapiListResponse<PageData>>(
      '/pages',
      {
        locale,
        'filters[slug][$eq]': slug,
        'populate[seo][populate]': '*',
        'populate[blocks][populate]': '*',
      }
    );

    return data.data[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch all published pages for all locales.
 * Used by generateStaticParams to pre-render all pages at build time.
 */
export async function getAllPages(): Promise<
  { slug: string; locale: string }[]
> {
  const locales = ['de', 'fr', 'en', 'it'];
  const results: { slug: string; locale: string }[] = [];

  for (const locale of locales) {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await fetchStrapi<StrapiListResponse<PageData>>(
        '/pages',
        {
          locale,
          'fields[0]': 'slug',
          'pagination[page]': String(page),
          'pagination[pageSize]': '100',
        },
        // Build-time fetch — no revalidation needed during SSG
        false
      );

      results.push(
        ...data.data.map((p) => ({ slug: p.slug, locale }))
      );

      hasMore = data.meta.pagination.page < data.meta.pagination.pageCount;
      page++;
    }
  }

  return results;
}

// ─────────────────────────────────────────────────────────────
// News Articles
// ─────────────────────────────────────────────────────────────

export async function getNewsArticles(
  locale: string,
  pageSize = 10,
  pageNumber = 1
): Promise<{ articles: NewsArticle[]; total: number }> {
  const data = await fetchStrapi<StrapiListResponse<NewsArticle>>(
    '/news-articles',
    {
      locale,
      'populate[coverImage]': 'true',
      'sort[0]': 'publishedAt:desc',
      'pagination[page]': String(pageNumber),
      'pagination[pageSize]': String(pageSize),
    }
  );

  return {
    articles: data.data,
    total: data.meta.pagination.total,
  };
}

export async function getNewsArticle(
  slug: string,
  locale: string
): Promise<NewsArticle | null> {
  try {
    const data = await fetchStrapi<StrapiListResponse<NewsArticle>>(
      '/news-articles',
      {
        locale,
        'filters[slug][$eq]': slug,
        'populate[coverImage]': 'true',
        'populate[seo][populate]': '*',
      }
    );

    return data.data[0] ?? null;
  } catch {
    return null;
  }
}
