import { Link } from '@/i18n/routing';
import { forwardRef } from 'react';
import { NavItemData } from './HeaderNav';
import Image from 'next/image';

interface HeaderItemProps {
    item: NavItemData;
    isHovered: boolean;
    onMouseEnter: () => void;
}

const HeaderItem = forwardRef<HTMLLIElement, HeaderItemProps>(({ item, isHovered, onMouseEnter }, ref) => {
    return (
        <li 
            ref={ref} 
            className="h-full flex items-center"
            onMouseEnter={onMouseEnter}
        >
            <Link href={item.href} className={`text-lg font-medium transition-colors z-40 ${isHovered ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'}`}>
                {item.text}
            </Link>

            {/* Submenu */}
            {item.submenu && (
                <div 
                    className={`absolute inset-x-24 top-[calc(100%+24px)] bg-background-primary shadow-xl rounded-xl p-8 z-50 transition-all duration-300 origin-top ${isHovered ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                >
                    <div className="flex gap-12 items-center">
                        {item.imageSrc && (
                            <Image 
                                src={item.imageSrc} 
                                alt={item.imageAlt || "Submenu Image"} 
                                width={500} 
                                height={500} 
                                className="h-[19rem] w-[19rem] aspect-square object-cover rounded-full shadow-xl shrink-0" 
                            />
                        )}
                        <div className="grid grid-cols-2 gap-6 w-full">
                            {item.submenu.map((subItem, idx) => (
                                <Link key={idx} href={subItem.href} className="block group">
                                    <h3 className="text-lg font-medium text-text-secondary group-hover:text-accent-primary mb-1 transition-colors">
                                        {subItem.title}
                                    </h3>
                                    {subItem.description && (
                                        <p className="text-sm text-text-primary">
                                            {subItem.description}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
});

HeaderItem.displayName = 'HeaderItem';
export default HeaderItem;
