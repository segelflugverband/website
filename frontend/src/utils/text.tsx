import { Link } from '@/i18n/routing';
import { IconExternalLink } from '@tabler/icons-react';

export const parseTextWithLinks = (text: string) => {
    if (!text) return null;
    
    // Regex to match markdown links: [link text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        // Push plain text before the link
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const linkText = match[1];
        const linkUrl = match[2];
        const isExternal = linkUrl.startsWith('http');

        if (isExternal) {
            parts.push(
                <a key={`link-${match.index}`} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline whitespace-nowrap">
                    {linkText}
                    <IconExternalLink size={18} stroke={1.5} className="inline-block ml-1 align-text-bottom" />
                </a>
            );
        } else {
            parts.push(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <Link key={`link-${match.index}`} href={linkUrl as any} className="text-accent-primary hover:underline whitespace-nowrap">
                    {linkText}
                </Link>
            );
        }

        lastIndex = linkRegex.lastIndex;
    }

    // Push remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
};
