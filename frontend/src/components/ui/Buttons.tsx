import React from 'react';
import { Link } from '@/i18n/routing';

type ButtonProps = {
    text?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    isExternal?: boolean;
}

export function ButtonPrimary({ text, href, onClick, className = '', icon, isExternal }: ButtonProps) {
    const baseStyles = `inline-flex items-center justify-center h-10 bg-accent-primary hover:bg-accent-hover text-text-tertiary py-2 ${text ? 'px-6' : 'w-10'} rounded-full cursor-pointer font-medium transition-colors duration-200 gap-2`;
    
    const content = (
        <>
            {icon && icon}
            {text && text}
        </>
    );

    if (href) {
        return (
            <Link 
                href={href} 
                className={`${baseStyles} ${className}`}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseStyles} ${className}`}>{content}</button>
    );
}

export function ButtonSecondary({ text, href, onClick, className = '', icon, isExternal }: ButtonProps) {
    const baseStyles = `inline-flex items-center justify-center h-10 bg-background-primary text-accent-primary py-2 ${text ? 'px-6' : 'w-10'} rounded-full cursor-pointer font-medium shadow-button-secondary transition-shadow duration-300 hover:shadow-button-hover gap-2`;
    
    const content = (
        <>
            {icon && icon}
            {text && text}
        </>
    );

    if (href) {
        return (
            <Link 
                href={href} 
                className={`${baseStyles} ${className}`}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseStyles} ${className}`}>{content}</button>
    );
}