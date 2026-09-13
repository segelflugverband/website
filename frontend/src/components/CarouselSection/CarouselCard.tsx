import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { IconChevronRight } from '@tabler/icons-react';

export type CarouselCardProps = {
    image: string;
    title: string;
    description: string;
    href: string;
};

export default function CarouselCard({ image, title, description, href }: CarouselCardProps) {
    return (
        <div className="flex flex-col bg-white shadow-[0_2px_12px_rgba(10,10,130,0.06)] border border-border-primary overflow-hidden h-[450px] w-[350px] shrink-0 snap-center">
            <div className="relative h-[200px] w-full shrink-0">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover" 
                />
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="text-xl font-medium text-text-secondary mb-3 leading-snug">{title}</h3>
                    <p className="text-text-primary text-[15px] leading-relaxed line-clamp-4">{description}</p>
                </div>
                
                <Link href={href} className="inline-flex items-center text-accent-primary text-sm font-medium hover:text-accent-hover mt-4">
                    <IconChevronRight size={16} className="mr-1" stroke={2} />
                    Mehr erfahren
                </Link>
            </div>
        </div>
    );
}
