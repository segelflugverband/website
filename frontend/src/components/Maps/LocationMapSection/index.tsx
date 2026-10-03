'use client';

import dynamic from 'next/dynamic';

const LocationMapSectionInner = dynamic(() => import('./LocationMapSection'), {
    ssr: false,
});

interface Props {
    heading?: string;
    label: string;
    address: string;
    latitude: number;
    longitude: number;
    zoom?: number;
}

export default function LocationMapSectionLoader(props: Props) {
    return <LocationMapSectionInner {...props} />;
}
