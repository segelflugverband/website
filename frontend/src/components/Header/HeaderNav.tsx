'use client';

import { useState, useRef, useEffect } from 'react';
import HeaderItem from './HeaderItem';
import { usePathname } from '@/i18n/routing';
import type { NavItem } from '@/types/strapi';

export type { NavItem };

// Re-export legacy types for backward compat with HeaderItem
export type SubmenuItem = {
    title: string;
    href: string;
    description?: string;
};

export type NavItemData = {
    text: string;
    href: string;
    submenu?: SubmenuItem[];
    imageSrc?: string;
    imageAlt?: string;
};

interface HeaderNavProps {
    navItems: NavItem[];
}

export default function HeaderNav({ navItems }: HeaderNavProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const navRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const pathname = usePathname();

    // Determine active index based on pathname
    useEffect(() => {
        const index = navItems.findIndex(item => pathname.startsWith(item.href));
        setActiveIndex(index !== -1 ? index : null);
    }, [pathname, navItems]);

    const updateIndicator = (index: number | null) => {
        if (index !== null && itemRefs.current[index]) {
            const el = itemRefs.current[index];
            setIndicatorStyle({
                left: el.offsetLeft,
                width: el.offsetWidth,
                opacity: 1
            });
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
    };

    // Update indicator when hovering changes, or fallback to active item
    useEffect(() => {
        if (hoveredIndex !== null) {
            updateIndicator(hoveredIndex);
        } else {
            updateIndicator(activeIndex);
        }
    }, [hoveredIndex, activeIndex]);

    // Map Strapi NavItem → HeaderItem's expected NavItemData shape
    const mappedItems: NavItemData[] = navItems.map(item => ({
        text: item.text,
        href: item.href,
        imageSrc: item.image?.url,
        imageAlt: item.imageAlt ?? item.image?.alternativeText ?? undefined,
        submenu: item.submenu?.map(s => ({
            title: s.title,
            href: s.href,
            description: s.description,
        })),
    }));

    return (
        <>
            {/* Overlay that covers the page below the header (header is h-28 = 112px) */}
            <div
                className={`fixed inset-0 top-28 bg-black/40 z-30 transition-opacity duration-300 pointer-events-none ${hoveredIndex !== null && navItems[hoveredIndex]?.submenu?.length ? 'opacity-100' : 'opacity-0'}`}
            />

            <nav className="hidden md:flex items-center h-full flex-1">
                <ul ref={navRef} className="flex items-center justify-center gap-10 h-full" onMouseLeave={() => setHoveredIndex(null)}>
                    {mappedItems.map((item, idx) => (
                        <HeaderItem
                            key={idx}
                            ref={el => { itemRefs.current[idx] = el; }}
                            item={item}
                            isHovered={hoveredIndex === idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                        />
                    ))}

                    {/* Sliding Active Border */}
                    <div
                        className="absolute bottom-0 h-[3px] bg-accent-primary transition-all duration-300 ease-out z-40"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`,
                            opacity: indicatorStyle.opacity
                        }}
                    />
                </ul>
            </nav>
        </>
    );
}
