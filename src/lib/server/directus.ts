import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export type DirectusListResponse<T> = {
	data: T[];
};

export type DirectusItemResponse<T> = {
	data: T;
};

export function hasDirectusConfig() {
	return Boolean(publicEnv.PUBLIC_DIRECTUS_URL);
}

export function toDirectusAssetUrl(value?: string | null) {
	if (!value) {
		return '';
	}

	if (/^https?:\/\//.test(value)) {
		return value;
	}

	const base = getDirectusUrl();

	if (value.startsWith('/')) {
		return `${base}${value}`;
	}

	return `${base}/assets/${value}`;
}

export function toOptimizedAssetUrl(value?: string | null) {
	const assetUrl = toDirectusAssetUrl(value);

	if (!assetUrl) {
		return '';
	}

	return `/image-proxy?url=${encodeURIComponent(assetUrl)}`;
}

export async function readItems<T>(collection: string, params: Record<string, string> = {}) {
	return request<DirectusListResponse<T>>(`/items/${collection}`, params);
}

async function request<T>(path: string, params: Record<string, string>) {
	if (!hasDirectusConfig()) {
		throw new Error('PUBLIC_DIRECTUS_URL is not configured');
	}

	const url = new URL(`${getDirectusUrl()}${path}`);

	for (const [key, value] of Object.entries(params)) {
		if (value) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json',
			...(privateEnv.DIRECTUS_TOKEN ? { Authorization: `Bearer ${privateEnv.DIRECTUS_TOKEN}` } : {})
		}
	});

	if (!response.ok) {
		throw new Error(`Directus request failed: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}

function getDirectusUrl() {
	const url = publicEnv.PUBLIC_DIRECTUS_URL;

	if (!url) {
		throw new Error('PUBLIC_DIRECTUS_URL is not configured');
	}

	return url.replace(/\/$/, '');
}
