import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    padded?: 'all' | 'desktop-only' | 'none';
    as?: React.ElementType;
}

export default function Container({ 
    children, 
    className = '',
    padded = 'all',
    as: Component = 'div'
}: ContainerProps) {
    let paddingClasses = '';
    if (padded === 'all') paddingClasses = 'px-6 md:px-12 lg:px-24';
    else if (padded === 'desktop-only') paddingClasses = 'lg:px-24';

    return (
        <Component className={`w-full max-w-[1920px] mx-auto ${paddingClasses} ${className}`}>
            {children}
        </Component>
    );
}
