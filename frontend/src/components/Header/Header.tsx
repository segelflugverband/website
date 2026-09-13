import { Link } from '@/i18n/routing';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import HeaderNav from './HeaderNav';
import type { NavItem, StrapiMedia } from '@/types/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface HeaderProps {
    navItems: NavItem[];
    logo?: StrapiMedia | null;
    siteName?: string;
}

export default function Header({ navItems, logo, siteName = 'SFVS' }: HeaderProps) {
    const logoSrc = logo ? getStrapiMediaUrl(logo.url) : '/logo/logo-color.svg';
    const logoAlt = logo?.alternativeText ?? siteName;

    return (
        <header className="w-full bg-background-primary h-28 flex items-center justify-center">
            <div className="max-w-[1920px] mx-auto px-24 h-20 flex items-center justify-center w-full relative">
                <Link href="/" className="flex-1">
                    <Image
                        src={logoSrc}
                        alt={logoAlt}
                        width={0}
                        height={0}
                        className="w-[225px] h-auto"
                    />
                </Link>

                <HeaderNav navItems={navItems} />
                <div className="flex flex-1 justify-end">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
