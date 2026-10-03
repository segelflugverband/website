'use client';

import { useRef, useCallback } from 'react';
import Map, { NavigationControl, AttributionControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import type { MapRef } from 'react-map-gl/maplibre';

// ─────────────────────────────────────────────────────────────
// MapTiler Positron style
// ─────────────────────────────────────────────────────────────

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '';

function getPositronStyleUrl(): string {
    return `https://api.maptiler.com/maps/positron/style.json?key=${MAPTILER_KEY}`;
}

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface BaseMapProps {
    /** Initial center [longitude, latitude] */
    center?: [number, number];
    /** Initial zoom level */
    zoom?: number;
    /** CSS class applied to the map wrapper div */
    className?: string;
    /** Map children (markers, popups, sources, layers) */
    children?: React.ReactNode;
    /** Callback providing the map ref once loaded */
    onMapRef?: (ref: MapRef) => void;
    /** Whether the map should be interactive (pan, zoom) — default true */
    interactive?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Switzerland defaults
// ─────────────────────────────────────────────────────────────

const SWITZERLAND_CENTER: [number, number] = [8.2275, 46.8182];
const SWITZERLAND_ZOOM = 7.5;

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function BaseMap({
    center = SWITZERLAND_CENTER,
    zoom = SWITZERLAND_ZOOM,
    className = '',
    children,
    onMapRef,
    interactive = true,
}: BaseMapProps) {
    const mapRef = useRef<MapRef>(null);

    const handleLoad = useCallback(() => {
        if (mapRef.current && onMapRef) {
            onMapRef(mapRef.current);
        }
    }, [onMapRef]);

    return (
        <Map
            ref={mapRef}
            mapLib={maplibregl}
            mapStyle={getPositronStyleUrl()}
            initialViewState={{
                longitude: center[0],
                latitude: center[1],
                zoom,
            }}
            style={{ width: '100%', height: '100%' }}
            className={className}
            attributionControl={false}
            interactive={interactive}
            onLoad={handleLoad}
        >
            <NavigationControl position="top-left" showCompass={false} />
            <AttributionControl position="bottom-left" compact />
            {children}
        </Map>
    );
}
