import CollapsibleText from './CollapsibleText';

interface CollapsibleTextCollectionProps {
    items: { id: number; title: string; content: string }[];
    removeTopMargin?: boolean;
}

export default function CollapsibleTextCollection({ items, removeTopMargin = false }: CollapsibleTextCollectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className={`w-full max-w-318 mx-auto px-8 ${removeTopMargin ? '-mt-44 pb-16 relative z-10' : 'py-16'}`}>
            <div className="flex flex-col gap-4">
                {items.map((item) => (
                    <CollapsibleText key={item.id} title={item.title} content={item.content} />
                ))}
            </div>
        </section>
    );
}
