import { Link } from '@/i18n/routing';
import Image from 'next/image';
import FooterItem from './FooterItem';
import FooterNav from './FooterNav';
import { ButtonSecondary } from '../ui/Buttons';
import {
    IconBrandInstagram,
    IconBrandYoutube,
    IconBrandTeams,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandTwitter,
} from '@tabler/icons-react';
import type { FooterColumn, SocialLink } from '@/types/strapi';

interface FooterProps {
    columns: FooterColumn[];
    copyright?: string;
    socialLinks?: SocialLink[];
}

const socialIconMap: Record<string, React.ReactNode> = {
    instagram: <IconBrandInstagram size={20} stroke={1.5} />,
    youtube: <IconBrandYoutube size={20} stroke={1.5} />,
    facebook: <IconBrandFacebook size={20} stroke={1.5} />,
    linkedin: <IconBrandLinkedin size={20} stroke={1.5} />,
    twitter: <IconBrandTwitter size={20} stroke={1.5} />,
    other: <IconBrandTeams size={20} stroke={1.5} />,
};

export default function Footer({
    columns,
    copyright,
    socialLinks = [],
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    // If Strapi returns no social links, fall back to hard-coded club links
    const resolvedSocialLinks: SocialLink[] =
        socialLinks.length > 0
            ? socialLinks
            : [
                  { id: 1, platform: 'instagram', url: 'https://instagram.com/sfvs_fsvv' },
                  { id: 2, platform: 'youtube', url: 'https://www.youtube.com/channel/UCF11rzaC0kkThJ74H3RUE-g' },
                  { id: 3, platform: 'other', url: 'https://sfvs.sharepoint.com/sites/SFVS-FSVVIntranet' },
              ];

    return (
        <footer>
            <div className="w-full bg-background-primary border-t border-border-primary flex justify-center items-center py-16">
                <section className="max-w-[1920px] px-24 mx-auto flex justify-center items-stretch w-full">
                    <FooterNav columns={columns} />
                    <div className="flex-1 flex flex-col justify-between">
                        {/* Social links */}
                        <div className="flex justify-end gap-4 mb-12">
                            {resolvedSocialLinks.map((sl) => (
                                <ButtonSecondary
                                    key={sl.id}
                                    icon={socialIconMap[sl.platform] ?? socialIconMap.other}
                                    href={sl.url}
                                    isExternal
                                />
                            ))}
                        </div>
                        {/* Partner logos (static — not managed via Strapi for now) */}
                        <div className="flex justify-end gap-4">
                            <Image src="/partners/swiss-olympic.svg" alt="Swiss Olympic" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/aecs.webp" alt="AeCS" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/fai.webp" alt="FAI" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/egu.webp" alt="EGU" width={100} height={100} className="w-auto h-18.75" />
                            <Image src="/partners/eas.webp" alt="EAS" width={100} height={100} className="w-auto h-18.75" />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full bg-background-secondary border-t border-border-primary flex justify-center items-center h-28">
                <section className="max-w-[1920px] px-24 mx-auto flex justify-between items-center w-full">
                    <ul className="flex-1 flex gap-3 items-center">
                        <Image src="/logo/logo-grey.svg" alt="Logo" width={0} height={0} className="w-[150px] h-auto" />
                        <FooterItem title="Nutzungsbedingungen" href="/legal/terms" />
                        <span className="text-text-footer">|</span>
                        <FooterItem title="Datenschutzerklärung" href="/legal/privacy" />
                        <span className="text-text-footer">|</span>
                        <FooterItem title="Cookies" href="/legal/cookies" />
                        <span className="text-text-footer">|</span>
                        <FooterItem title="Impressum" href="/legal/imprint" />
                    </ul>
                    <div className="flex-1 flex justify-end">
                        <span className="text-text-footer">
                            {copyright ?? `Alle Rechte vorbehalten. © Segelflugverband der Schweiz, `}
                            {currentYear}
                        </span>
                    </div>
                </section>
            </div>
        </footer>
    );
}
