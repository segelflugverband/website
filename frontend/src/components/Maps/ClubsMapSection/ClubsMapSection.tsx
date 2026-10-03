'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import BaseMap from '@/components/Maps/BaseMap';
import ClubSidebar from '@/components/Maps/ClubsMapSection/ClubSidebar';
import type { Club } from '@/types/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import styles from './ClubsMapSection.module.css';
import Container from '@/components/ui/Container';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface ClubsMapSectionProps {
    heading?: string;
    clubs: Club[];
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function ClubsMapSection({ heading, clubs }: ClubsMapSectionProps) {
    const [selectedClubId, setSelectedClubId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef<MapRef | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const selectedClub = clubs.find((c) => c.id === selectedClubId) ?? null;

    // Filter clubs based on search query (name or address)
    const filteredClubs = searchQuery.trim()
        ? clubs.filter((club) => {
              const q = searchQuery.toLowerCase();
              return (
                  club.name.toLowerCase().includes(q) ||
                  club.address.toLowerCase().includes(q)
              );
          })
        : clubs;

    const handleMarkerClick = useCallback(
        (club: Club) => {
            setSelectedClubId(club.id);
            mapRef.current?.flyTo({
                center: [club.longitude, club.latitude],
                zoom: 12,
                duration: 800,
            });

            // Scroll the sidebar item into view
            if (sidebarRef.current) {
                const el = sidebarRef.current.querySelector(
                    `[data-club-id="${club.id}"]`
                );
                el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        },
        []
    );

    const handleSidebarSelect = useCallback(
        (club: Club) => {
            setSelectedClubId(club.id);
            mapRef.current?.flyTo({
                center: [club.longitude, club.latitude],
                zoom: 12,
                duration: 800,
            });
        },
        []
    );

    const handleMapRef = useCallback((ref: MapRef) => {
        mapRef.current = ref;
    }, []);

    // Close popup when clicking outside (on map background)
    const handleMapClick = useCallback(() => {
        setSelectedClubId(null);
    }, []);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedClubId(null);
    }, [searchQuery]);

    return (
        <Container as="section" className="py-12 md:py-16">
            <div className="w-full flex flex-col">
                {heading && <h2 className="text-3xl md:text-4xl font-medium text-text-secondary mb-8">{heading}</h2>}

                <div className={`${styles.layout} rounded-xl shadow-sm border border-border-primary overflow-hidden`}>
                    {/* Map panel */}
                <div className={styles.mapPanel}>
                    <BaseMap onMapRef={handleMapRef}>
                        {filteredClubs.map((club) => (
                            <Marker
                                key={club.id}
                                longitude={club.longitude}
                                latitude={club.latitude}
                                anchor="bottom"
                                onClick={(e) => {
                                    e.originalEvent.stopPropagation();
                                    handleMarkerClick(club);
                                }}
                            >
                                <div
                                    className={`${styles.marker} ${
                                        selectedClubId === club.id ? styles.markerActive : ''
                                    }`}
                                >
                                    <svg
                                        width="28"
                                        height="36"
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
                        ))}

                        {selectedClub && (
                            <Popup
                                longitude={selectedClub.longitude}
                                latitude={selectedClub.latitude}
                                anchor="bottom"
                                offset={[0, -36] as [number, number]}
                                onClose={() => setSelectedClubId(null)}
                                closeOnClick={false}
                                className={styles.popup}
                            >
                                <div className={styles.popupContent}>
                                    {selectedClub.logo && (
                                        <img
                                            src={getStrapiMediaUrl(selectedClub.logo.url)}
                                            alt={`${selectedClub.name} Logo`}
                                            className={styles.popupLogo}
                                        />
                                    )}
                                    <strong className={styles.popupName}>
                                        {selectedClub.name}
                                    </strong>
                                    <p className={styles.popupAddress}>
                                        {selectedClub.address}
                                    </p>
                                    {selectedClub.website && (
                                        <a
                                            href={
                                                selectedClub.website.startsWith('http')
                                                    ? selectedClub.website
                                                    : `https://${selectedClub.website}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.popupLink}
                                        >
                                            {selectedClub.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    )}
                                </div>
                            </Popup>
                        )}
                    </BaseMap>
                </div>

                {/* Sidebar */}
                <ClubSidebar
                    ref={sidebarRef}
                    clubs={filteredClubs}
                    totalCount={clubs.length}
                    selectedClubId={selectedClubId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelect={handleSidebarSelect}
                />
            </div>
            </div>
        </Container>
    );
}
