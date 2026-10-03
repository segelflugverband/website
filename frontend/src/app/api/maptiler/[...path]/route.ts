import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────
// Proxies requests to the MapTiler API with the required
// User-Agent header that browsers cannot set directly.
//
// Example:
//   /api/maptiler/maps/positron/style.json
//   → https://api.maptiler.com/maps/positron/style.json?key=…
// ─────────────────────────────────────────────────────────────

const MAPTILER_BASE = 'https://api.maptiler.com';
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '';
const USER_AGENT = 'sfvs-fsvv';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const targetPath = path.join('/');

    // Forward all query params from the original request, then ensure the key is present
    const url = new URL(`/${targetPath}`, MAPTILER_BASE);
    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
    });
    if (!url.searchParams.has('key')) {
        url.searchParams.set('key', MAPTILER_KEY);
    }

    const headers: Record<string, string> = {
        'User-Agent': USER_AGENT,
        Accept: request.headers.get('Accept') ?? '*/*',
    };

    const referer = request.headers.get('referer');
    if (referer) headers['Referer'] = referer;

    const origin = request.headers.get('origin');
    if (origin) headers['Origin'] = origin;

    console.log('[MapTiler Proxy] Fetching:', url.toString());
    console.log('[MapTiler Proxy] Headers sent:', headers);

    const upstreamRes = await fetch(url.toString(), { headers });

    console.log(`[MapTiler Proxy] Upstream status: ${upstreamRes.status} ${upstreamRes.statusText}`);
    if (!upstreamRes.ok) {
        const text = await upstreamRes.clone().text();
        console.log(`[MapTiler Proxy] Upstream body:`, text.slice(0, 200));
    }

    // Stream the response back with proper content-type and caching
    const contentType = upstreamRes.headers.get('Content-Type') ?? 'application/octet-stream';

    return new NextResponse(upstreamRes.body, {
        status: upstreamRes.status,
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
