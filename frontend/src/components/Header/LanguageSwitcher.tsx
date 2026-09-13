'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonSecondary } from '@/components/ui/Buttons';
import { IconLanguage, IconX } from '@tabler/icons-react';

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = useLocale();

    const languages = [
        { code: 'de', label: 'Deutsch' },
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' }
    ] as const;

    const handleLanguageSelect = (locale: typeof languages[number]['code']) => {
        router.replace(pathname, { locale });
        setIsOpen(false);
    };

    return (
        <>
            <ButtonSecondary 
                onClick={() => setIsOpen(true)} 
                icon={<IconLanguage size={20} stroke={1.5} />} 
                className="w-10 h-10 px-0 flex-shrink-0"
            />

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-[400px] p-8 relative flex flex-col items-center">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-accent-primary transition-colors"
                        >
                            <IconX size={24} stroke={1.5} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-text-primary mb-8">
                            Sprache
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-6 w-full place-items-center">
                            {languages.map((lang) => {
                                const isActive = currentLocale === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageSelect(lang.code)}
                                        className={`
                                            w-28 h-28 rounded-full border-[1.5px] flex items-center justify-center text-sm font-medium transition-all duration-300
                                            ${isActive 
                                                ? 'border-accent-primary text-accent-primary bg-accent-primary/5' 
                                                : 'border-gray-200 text-text-primary hover:border-accent-primary hover:text-accent-primary hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {lang.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
