import { Link } from '@/i18n/routing';
import { IconExternalLink } from '@tabler/icons-react';

export default function FooterItem({ title, href, isExternal = false }: { title: string, href: string, isExternal?: boolean }) {
    return (
        <li>
            <Link 
                href={href} 
                className="h-8 transition-colors text-text-footer hover:text-accent-primary flex items-center gap-1 w-fit"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {title}
                {isExternal && <IconExternalLink size={18} stroke={1.5} />}
            </Link>
        </li>
    );
}