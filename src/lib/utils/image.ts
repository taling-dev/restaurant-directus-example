/**
 * Generate a srcset string from a Directus asset URL.
 *
 * Works by substituting the `width` query parameter that
 * toOptimizedAssetUrl already injects. Returns undefined for
 * external URLs so the browser just uses the plain `src`.
 */
const DEFAULT_WIDTHS = [400, 800, 1200, 1600];
const LOCAL_ORIGIN = 'http://directus.local';

export function toSrcset(url: string | undefined | null, widths = DEFAULT_WIDTHS) {
	if (!url) {
		return undefined;
	}

	try {
		const isAbsolute = /^[a-z]+:\/\//i.test(url);
		const imageUrl = new URL(url, LOCAL_ORIGIN);

		if (!isResponsiveImageUrl(imageUrl)) {
			return undefined;
		}

		return widths
			.map((w) => {
				const u = new URL(imageUrl.toString());
				u.searchParams.set('width', String(w));
				const sizedUrl = isAbsolute ? u.toString() : `${u.pathname}${u.search}${u.hash}`;
				return `${sizedUrl} ${w}w`;
			})
			.join(', ');
	} catch {
		return undefined;
	}
}

function isResponsiveImageUrl(url: URL) {
	return url.pathname.includes('/assets/') || url.pathname === '/image-proxy';
}

export function toSizes({
	mobile = '100vw',
	sm,
	md,
	lg,
	xl
}: {
	mobile?: string;
	sm?: string;
	md?: string;
	lg?: string;
	xl?: string;
}) {
	const rules = [
		xl ? `(min-width: 1280px) ${xl}` : null,
		lg ? `(min-width: 1024px) ${lg}` : null,
		md ? `(min-width: 768px) ${md}` : null,
		sm ? `(min-width: 640px) ${sm}` : null,
		mobile
	].filter(Boolean);

	return rules.join(', ');
}
