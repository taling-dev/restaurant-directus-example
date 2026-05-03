/**
 * Generate a srcset string from a Directus asset URL.
 *
 * Uses width transforms for Directus and Unsplash so returned
 * assets match the rendered size without over-downloading.
 */

/** Widths for small card thumbnails (menu items, promos, gallery). Max display ~400px. */
export const CARD_WIDTHS = [320, 480, 640, 800];

/** Widths for medium cards (about page, category images). Max display ~700px. */
export const MEDIUM_WIDTHS = [320, 480, 640, 800, 960];

/** Widths for large hero images. Max display ~800px. */
export const HERO_WIDTHS = [320, 480, 640, 800, 960, 1200];

/** Default fallback widths. */
const DEFAULT_WIDTHS = CARD_WIDTHS;

/** Default quality (0-100). 65 is a sweet spot for photos on the web. */
const DEFAULT_QUALITY = 65;

export function toSrcset(
	url: string | undefined | null,
	options: { widths?: number[]; quality?: number } = {}
) {
	const { widths = DEFAULT_WIDTHS, quality = DEFAULT_QUALITY } = options;

	if (!url) {
		return undefined;
	}

	try {
		const imageUrl = new URL(url);

		if (!isResponsiveImageUrl(imageUrl)) {
			return undefined;
		}

		return widths
			.map((w) => {
				const u = new URL(imageUrl.toString());
				applyResponsiveTransform(u, w, quality);
				return `${u.toString()} ${w}w`;
			})
			.join(', ');
	} catch {
		return undefined;
	}
}

export function toAspectDimensions(ratio: number, width = 1200) {
	return {
		width,
		height: Math.round(width / ratio)
	};
}

function isResponsiveImageUrl(url: URL) {
	return url.pathname.includes('/assets/') || url.hostname === 'images.unsplash.com';
}

function applyResponsiveTransform(url: URL, width: number, quality: number) {
	if (url.hostname === 'images.unsplash.com') {
		url.searchParams.set('w', String(width));
		url.searchParams.set('q', String(quality));
		url.searchParams.set('auto', 'format');
		return;
	}

	url.searchParams.set('width', String(width));
	url.searchParams.set('quality', String(quality));
	url.searchParams.set('format', 'auto');
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
