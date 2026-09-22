import { H2 } from "../ui/Headings";
import { parseTextWithLinks } from "@/utils/text";

interface TextSectionProps {
    heading?: string;
    content: string;
}

export default function TextSection({ heading, content }: TextSectionProps) {
    return (
        <section className="w-full max-w-318 mx-auto py-16">
            {heading && (
                <H2 className="mb-8">
                    {heading}
                </H2>
            )}
            <div className="text-text-primary text-lg leading-relaxed whitespace-pre-wrap px-16">
                {parseTextWithLinks(content)}
            </div>
        </section>
    );
}
