import React from 'react';

export function H1({ children, className = '' }: { children: React.ReactNode, className?: string }) { 
    return (
        <h1 className={`text-3xl lg:text-5xl font-medium text-text-secondary tracking-tight leading-tight w-fit ${className}`}>
            {children}
        </h1>
    );
}

export function H2({ children, className = '' }: { children: React.ReactNode, className?: string }) { 
    return (
        <h2 className={`text-3xl font-medium text-text-secondary tracking-tight ${className}`}>
            {children}
        </h2>
    );
}
