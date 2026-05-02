/**
 * Generate a srcset string from a Directus asset URL.
 *
 * Uses width/height transforms so Directus can return appropriately
 * cropped assets for the rendered aspect ratio.
 */
const DEFAULT_WIDTHS = [400, 800, 1200, 1600];

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
				u.searchParams.set('width', String(w));
				if (h) {
					u.searchParams.set('height', String(h));
					u.searchParams.set('fit', 'cover');
				}
				return `${u.toString()} ${w}w`;
			})
			.join(', ');
	} catch {
		return undefined;
	}
}

function isResponsiveImageUrl(url: URL) {
	return url.pathname.includes('/assets/');
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
