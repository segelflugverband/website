// ─────────────────────────────────────────────────────────────
// Strapi REST API v5 — TypeScript interfaces
// ─────────────────────────────────────────────────────────────

// ── Media ────────────────────────────────────────────────────

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
  mime: string;
  name: string;
}

// ── Shared components ─────────────────────────────────────────

export interface SubmenuItem {
  id: number;
  title: string;
  href: string;
  description?: string;
}

export interface NavItem {
  id: number;
  text: string;
  href: string;
  image: StrapiMedia | null;
  imageAlt?: string;
  submenu: SubmenuItem[];
}

export interface FooterLink {
  id: number;
  title: string;
  href: string;
  isExternal: boolean;
}

export interface FooterColumn {
  id: number;
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: number;
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'other';
  url: string;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  ogImage: StrapiMedia | null;
}

export interface Card {
  id: number;
  title: string;
  description?: string;
  image: StrapiMedia | null;
  href?: string;
}

// ── Section blocks (dynamic zone) ────────────────────────────

export interface IntroSectionBlock {
  __component: 'sections.intro-section';
  id: number;
  headingAccent: string;
  headingBase: string;
  paragraph: string;
  image: StrapiMedia | null;
  imageAlt?: string;
}

export interface ImageSectionBlock {
  __component: 'sections.image-section';
  id: number;
  image: StrapiMedia;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imagePosition: 'left' | 'right';
}

export interface CarouselSectionBlock {
  __component: 'sections.carousel-section';
  id: number;
  heading: string;
  paragraph?: string;
  textPosition: 'left' | 'right';
  cards: Card[];
}

export interface VideoSectionBlock {
  __component: 'sections.video-section';
  id: number;
  video: StrapiMedia | null;
  videoUrl?: string;
  posterImage: StrapiMedia | null;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface TextSectionBlock {
  __component: 'sections.text-section';
  id: number;
  content: string;
}

export type PageBlock =
  | IntroSectionBlock
  | ImageSectionBlock
  | CarouselSectionBlock
  | VideoSectionBlock
  | TextSectionBlock;

// ── Content types ─────────────────────────────────────────────

export interface GlobalData {
  id: number;
  documentId: string;
  siteName: string;
  logo: StrapiMedia | null;
  headerNav: NavItem[];
  footerColumns: FooterColumn[];
  copyright?: string;
  socialLinks: SocialLink[];
  locale: string;
}

export interface PageData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  seo: SEO | null;
  blocks: PageBlock[];
}

export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage: StrapiMedia | null;
  seo: SEO | null;
  locale: string;
  publishedAt: string;
}

// ── Strapi v5 response wrappers ───────────────────────────────

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
