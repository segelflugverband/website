import React from 'react';

export default function PageContainer({ 
    children, 
    className = '' 
}: { 
    children: React.ReactNode, 
    className?: string 
}) {
    return (
        <main className={`flex max-w-[1920px] min-h-screen flex-col items-center justify-start p-24 gap-48 mx-auto ${className}`}>
            {children}
        </main>
    );
}
