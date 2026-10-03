'use client';

import dynamic from 'next/dynamic';
import type { Club } from '@/types/strapi';

const ClubsMapSectionInner = dynamic(() => import('./ClubsMapSection'), {
    ssr: false,
});

interface Props {
    heading?: string;
    clubs: Club[];
}

export default function ClubsMapSectionLoader(props: Props) {
    return <ClubsMapSectionInner {...props} />;
}
