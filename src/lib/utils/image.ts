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
	if (!url || !url.includes('/assets/')) {
		return undefined;
	}

	try {
		const isAbsolute = /^[a-z]+:\/\//i.test(url);

		return widths
			.map((w) => {
				const u = new URL(url, LOCAL_ORIGIN);
				u.searchParams.set('width', String(w));
				const sizedUrl = isAbsolute ? u.toString() : `${u.pathname}${u.search}${u.hash}`;
				return `${sizedUrl} ${w}w`;
			})
			.join(', ');
	} catch {
		return undefined;
	}
}
