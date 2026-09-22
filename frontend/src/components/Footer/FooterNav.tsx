import FooterItem from "./FooterItem";
import type { FooterColumn } from "@/types/strapi";

interface FooterNavProps {
    columns: FooterColumn[];
}

export default function FooterNav({ columns }: FooterNavProps) {
    return (
        <nav className="flex flex-col flex-2 justify-between gap-12">
            <div className="flex flex-wrap gap-8">
                {columns.map((column) => (
                    <ul key={column.id} className="min-w-62.5">
                        {column.links.map((link) => (
                            <FooterItem
                                key={link.id}
                                title={link.title}
                                href={link.href}
                                isExternal={link.isExternal}
                            />
                        ))}
                    </ul>
                ))}
            </div>
        </nav>
    );
}