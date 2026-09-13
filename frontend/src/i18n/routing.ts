import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['de', 'fr', 'en', 'it'],
  defaultLocale: 'de',
  // No pathnames map — slugs are managed in Strapi per locale.
  // next-intl handles the /{locale}/ URL prefix; all page routing
  // is done by the [...slug] catch-all that queries Strapi.
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);