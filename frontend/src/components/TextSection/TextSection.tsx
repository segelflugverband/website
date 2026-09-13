interface TextSectionProps {
    content: string;
}

/**
 * Renders Strapi richtext (markdown) content.
 * For full markdown support, install and use react-markdown.
 * Currently renders as a styled prose block with dangerouslySetInnerHTML
 * since Strapi v5 returns richtext as markdown strings.
 */
export default function TextSection({ content }: TextSectionProps) {
    return (
        <section className="w-full max-w-[900px] mx-auto px-8 py-16">
            <div
                className="prose prose-lg max-w-none text-text-primary leading-relaxed"
                // Strapi v5 richtext is markdown — render as HTML after parsing.
                // Replace this with react-markdown if you need safe rendering.
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
}
