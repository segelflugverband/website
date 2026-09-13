'use client';

import { useState, useRef } from 'react';
import CarouselCard, { CarouselCardProps } from './CarouselCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { H2 } from '@/components/ui/Headings';

interface CarouselSectionProps {
    heading: string | React.ReactNode;
    paragraph: string;
    cards: CarouselCardProps[];
    textPosition?: 'left' | 'right';
}

export default function CarouselSection({ heading, paragraph, cards, textPosition = 'left' }: CarouselSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Scroll constants
    const cardWidth = 350;
    const cardGap = 32; // gap-8 = 32px
    const snapDistance = cardWidth + cardGap;

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const index = Math.round(scrollLeft / snapDistance);
            setActiveIndex(index);
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: index * snapDistance,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    const nextSlide = () => {
        // Smoothly move to the start if at the end
        if (activeIndex === cards.length - 1) {
            scrollToIndex(0);
        } else {
            scrollToIndex(activeIndex + 1);
        }
    };

    const prevSlide = () => {
        // Smoothly move to the end if at the start
        if (activeIndex === 0) {
            scrollToIndex(cards.length - 1);
        } else {
            scrollToIndex(activeIndex - 1);
        }
    };

    return (
        <div className="w-full overflow-hidden">
            <div className={`max-w-[1920px] mx-auto flex items-center gap-12 ${textPosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                
                <div className="flex-1 flex flex-col justify-center px-12 md:px-24 w-full md:w-[40%] shrink-0 z-20 relative">
                    <H2 className="mb-6">{heading}</H2>
                    <p className="text-text-primary leading-relaxed mb-12 max-w-md">
                        {paragraph}
                    </p>
                </div>

                {/* Carousel Block */}
                <div className="flex-1 relative flex flex-col items-center justify-center w-full md:w-[60%] shrink-0">
                    <div className="relative w-full h-[500px] flex items-center">
                        {/* Left Gradient Overlay */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-primary to-transparent z-10 pointer-events-none" />
                        
                        {/* Right Gradient Overlay */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-primary to-transparent z-10 pointer-events-none" />

                        {/* Scroll Container */}
                        <div 
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto gap-8 px-[calc(50%-175px)] snap-x snap-mandatory py-8 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {cards.map((card, idx) => (
                                <CarouselCard key={idx} {...card} />
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-6 mt-2">
                        <button 
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors bg-white shadow-sm cursor-pointer"
                        >
                            <IconChevronLeft size={20} stroke={2} />
                        </button>
                        
                        {/* Dots / Lines */}
                        <div className="flex items-center gap-2">
                            {cards.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToIndex(idx)}
                                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? 'w-8 bg-accent-primary' : 'w-4 bg-border-primary hover:bg-text-primary'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button 
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors bg-white shadow-sm cursor-pointer"
                        >
                            <IconChevronRight size={20} stroke={2} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
