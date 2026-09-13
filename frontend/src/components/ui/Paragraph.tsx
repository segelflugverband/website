export default function Paragraph({ children, className = '' }: { children: React.ReactNode, className?: string }) { 
    return (
        <p className={`text-text-primary leading-7.5 px-16 max-w-350 ${className}`}>
            {children}
        </p>
    );
}