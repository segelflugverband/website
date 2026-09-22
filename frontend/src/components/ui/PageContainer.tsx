import React from 'react';

export default function PageContainer({ 
    children, 
    className = '' 
}: { 
    children: React.ReactNode, 
    className?: string 
}) {
    return (
        <main className={`flex w-full min-h-screen flex-col justify-start py-6 md:py-12 lg:py-24 gap-48 overflow-x-hidden ${className}`}>
            {children}
        </main>
    );
}
