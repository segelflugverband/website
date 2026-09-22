'use client';

import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { parseTextWithLinks } from '@/utils/text';

interface CollapsibleTextProps {
    title: string;
    content: string;
}

export default function CollapsibleText({ title, content }: CollapsibleTextProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-white rounded-xl shadow-[0_2px_16px_rgba(10,10,130,0.04)] overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:px-8 text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="text-xl font-semibold text-accent-primary">
                    {title}
                </span>
                <IconChevronDown
                    size={28}
                    stroke={2}
                    className={`text-accent-primary shrink-0 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </button>
            
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 md:px-8 pt-0 text-text-primary text-lg leading-relaxed whitespace-pre-wrap">
                        {parseTextWithLinks(content)}
                    </div>
                </div>
            </div>
        </div>
    );
}
