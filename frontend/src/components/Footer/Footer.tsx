import Image from 'next/image';
import FooterItem from './FooterItem';
import FooterNav from './FooterNav';
import { ButtonSecondary } from '../ui/Buttons';
import {
    IconBrandInstagram,
    IconBrandYoutube,
    IconBrandTeams,
    IconBrandGithub
} from '@tabler/icons-react';
import type { FooterColumn, SocialLink } from '@/types/strapi';
import { useTranslations } from 'next-intl';

interface FooterProps {
    columns: FooterColumn[];
    copyright?: string;
    socialLinks?: SocialLink[];
}

const socialIconMap: Record<string, React.ReactNode> = {
    instagram: <IconBrandInstagram size={20} stroke={1.5} />,
    youtube: <IconBrandYoutube size={20} stroke={1.5} />,
    github: <IconBrandGithub size={20} stroke={1.5} />,
    teams: <IconBrandTeams size={20} stroke={1.5} />,
};

export default function Footer({
    columns,
    copyright,
    socialLinks = [],
}: FooterProps) {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    // If Strapi returns no social links, fall back to hard-coded club links
    const resolvedSocialLinks: SocialLink[] =
        socialLinks.length > 0
            ? socialLinks
            : [
                  { id: 1, platform: 'instagram', url: 'https://instagram.com/sfvs_fsvv' },
                  { id: 2, platform: 'youtube', url: 'https://www.youtube.com/channel/UCF11rzaC0kkThJ74H3RUE-g' },
                  { id: 3, platform: 'github', url: 'https://github.com/segelflugverband' },
                  { id: 4, platform: 'teams', url: 'https://sfvs.sharepoint.com/sites/SFVS-FSVVIntranet' },
              ];

    return (
        <footer>
            <div className="w-full bg-background-primary border-t border-border-primary flex justify-center items-center py-16">
                <section className="max-w-[1920px] px-6 md:px-12 xl:px-24 mx-auto flex flex-col xl:flex-row justify-center items-stretch w-full">
                    <FooterNav columns={columns} />
                    <div className="flex-1 flex flex-col justify-between mt-24 xl:mt-0">
                        {/* Social links */}
                        <div className="flex flex-wrap justify-start xl:justify-end gap-4 mb-12">
                            {resolvedSocialLinks.map((sl) => (
                                <ButtonSecondary
                                    key={sl.id}
                                    icon={socialIconMap[sl.platform] ?? socialIconMap.teams}
                                    href={sl.url}
                                    isExternal
                                    ariaLabel={`${sl.platform}`}
                                />
                            ))}
                        </div>
                        {/* Partner logos (static — not managed via Strapi for now) */}
                        <div className="flex flex-wrap justify-start xl:justify-end gap-4">
                            <Image src="/partners/swiss-olympic.svg" alt="Swiss Olympic" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/aecs.webp" alt="AeCS" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/fai.webp" alt="FAI" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/egu.webp" alt="EGU" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/eas.webp" alt="EAS" width={100} height={100} className="w-auto h-18.75" />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full bg-background-secondary border-t border-border-primary flex justify-center items-center h-fit xl:h-28 py-16 xl:py-0">
                <section className="max-w-[1920px] px-6 md:px-12 xl:px-24 mx-auto flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-3 xl:gap-0">
                    <Image src="/logo/logo-grey.svg" alt="Logo" width={0} height={0} className="w-37.5 h-auto block xl:hidden mb-1.5" />
                    <ul className="flex-1 flex flex-wrap gap-3 items-center">
                        <li className="hidden xl:block">
                            <Image src="/logo/logo-grey.svg" alt="Logo" width={0} height={0} className="w-37.5 h-auto" />
                        </li>
                        <FooterItem title={t('Footer.legal.terms')} href="/legal/terms" />
                        <li aria-hidden="true"><span className="text-text-quaternary">|</span></li>
                        <FooterItem title={t('Footer.legal.privacy')} href="/legal/privacy" />
                        <li aria-hidden="true"><span className="text-text-quaternary">|</span></li>
                        <FooterItem title={t('Footer.legal.cookies')} href="/legal/cookies" />
                        <li aria-hidden="true"><span className="text-text-quaternary">|</span></li>
                        <FooterItem title={t('Footer.legal.imprint')} href="/legal/imprint" />
                    </ul>
                    <div className="flex-1 flex justify-end">
                        <span className="text-text-quaternary">
                            {copyright ?? t('Footer.legal.copyright')}
                            {currentYear}
                        </span>
                    </div>
                </section>
            </div>
        </footer>
    );
}
