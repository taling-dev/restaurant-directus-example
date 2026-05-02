/**
 * Generate a srcset string from a Directus asset URL.
 *
 * Uses width/height transforms for Directus and Unsplash so returned
 * assets match the rendered aspect ratio.
 */
const DEFAULT_WIDTHS = [320, 384, 480, 640, 768, 800, 960, 1200, 1600];

export function toSrcset(
	url: string | undefined | null,
	options: { widths?: number[]; ratio?: number } = {}
) {
	const { widths = DEFAULT_WIDTHS, ratio } = options;

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
				const h = ratio ? Math.round(w / ratio) : undefined;
				const u = new URL(imageUrl.toString());
				applyResponsiveTransform(u, w, h);
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

function applyResponsiveTransform(url: URL, width: number, height?: number) {
	if (url.hostname === 'images.unsplash.com') {
		url.searchParams.set('w', String(width));
		url.searchParams.set('q', '78');
		url.searchParams.set('auto', 'format');

		if (height) {
			url.searchParams.set('h', String(height));
			url.searchParams.set('fit', 'crop');
		}

		return;
	}

	url.searchParams.set('width', String(width));
	url.searchParams.set('quality', '78');
	url.searchParams.set('format', 'auto');

	if (height) {
		url.searchParams.set('height', String(height));
		url.searchParams.set('fit', 'cover');
	}
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
