import { forwardRef } from 'react';
import type { Club } from '@/types/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import { IconSearch } from '@tabler/icons-react';
import styles from './ClubsMapSection.module.css';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface ClubSidebarProps {
    clubs: Club[];
    totalCount: number;
    selectedClubId: number | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSelect: (club: Club) => void;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const ClubSidebar = forwardRef<HTMLDivElement, ClubSidebarProps>(
    function ClubSidebar(
        { clubs, totalCount, selectedClubId, searchQuery, onSearchChange, onSelect },
        ref
    ) {
        return (
            <aside className={styles.sidebar}>
                {/* Search bar */}
                <div className={styles.searchBar}>
                    <div className={styles.searchInputWrapper}>
                        <IconSearch size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="PLZ oder Ort"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Count */}
                <p className={styles.count}>
                    {clubs.length === totalCount
                        ? `${totalCount} Standorte`
                        : `${clubs.length} von ${totalCount} Standorten`}
                </p>

                {/* Scrollable list */}
                <div ref={ref} className={styles.list}>
                    {clubs.map((club) => (
                        <button
                            key={club.id}
                            data-club-id={club.id}
                            type="button"
                            className={`${styles.clubCard} ${
                                selectedClubId === club.id ? styles.clubCardActive : ''
                            }`}
                            onClick={() => onSelect(club)}
                        >
                            <div className={styles.clubLogo}>
                                {club.logo ? (
                                    <img
                                        src={getStrapiMediaUrl(club.logo.url)}
                                        alt={`${club.name} Logo`}
                                        className={styles.clubLogoImg}
                                    />
                                ) : (
                                    <div className={styles.clubLogoPlaceholder}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                                                fill="currentColor"
                                                opacity="0.2"
                                            />
                                            <path
                                                d="M12 6l-4 8h8l-4-8z"
                                                fill="currentColor"
                                                opacity="0.5"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className={styles.clubInfo}>
                                <strong className={styles.clubName}>{club.name}</strong>
                                <p className={styles.clubAddress}>{club.address}</p>
                                {club.website && (
                                    <a
                                        href={
                                            club.website.startsWith('http')
                                                ? club.website
                                                : `https://${club.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.clubWebsite}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {club.website.replace(/^https?:\/\//, '')}
                                    </a>
                                )}
                            </div>
                        </button>
                    ))}

                    {clubs.length === 0 && (
                        <p className={styles.emptyState}>
                            Keine Clubs gefunden.
                        </p>
                    )}
                </div>
            </aside>
        );
    }
);

export default ClubSidebar;
