'use client';

import { Marker } from 'react-map-gl/maplibre';
import BaseMap from '@/components/Maps/BaseMap';
import Container from '@/components/ui/Container';
import styles from './LocationMapSection.module.css';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface LocationMapSectionProps {
    heading?: string;
    label: string;
    address: string;
    latitude: number;
    longitude: number;
    zoom?: number;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function LocationMapSection({
    heading,
    label,
    address,
    latitude,
    longitude,
    zoom = 14,
}: LocationMapSectionProps) {
    return (
        <Container as="section" className="py-12 md:py-16">
            <div className="w-full flex flex-col">
                {heading && <h2 className="text-3xl md:text-4xl font-medium text-text-secondary mb-8">{heading}</h2>}

                <div className={`${styles.layout} rounded-xl shadow-sm border border-border-primary overflow-hidden`}>
                    {/* Map */}
                <div className={styles.mapPanel}>
                    <BaseMap
                        center={[longitude, latitude]}
                        zoom={zoom}
                    >
                        <Marker
                            longitude={longitude}
                            latitude={latitude}
                            anchor="bottom"
                        >
                            <div className={styles.marker}>
                                <svg
                                    width="32"
                                    height="42"
                                    viewBox="0 0 28 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z"
                                        fill="currentColor"
                                    />
                                    <circle cx="14" cy="13" r="5.5" fill="white" />
                                </svg>
                            </div>
                        </Marker>
                    </BaseMap>
                </div>

                {/* Address card */}
                <div className={styles.addressCard}>
                    <div className={styles.addressIcon}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className={styles.addressContent}>
                        <strong className={styles.addressLabel}>{label}</strong>
                        <p className={styles.addressText}>{address}</p>
                    </div>
                </div>
            </div>
            </div>
        </Container>
    );
}
