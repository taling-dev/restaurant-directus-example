import sharp from 'sharp';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';

const MAX_WIDTH = 1600;

export async function GET({ url, fetch }) {
	const target = url.searchParams.get('url');

	if (!target) {
		throw error(400, 'Missing image url');
	}

	const directusBase = publicEnv.PUBLIC_DIRECTUS_URL?.replace(/\/$/, '');
	const requestHeaders =
		directusBase && target.startsWith(directusBase) && privateEnv.DIRECTUS_TOKEN
			? { Authorization: `Bearer ${privateEnv.DIRECTUS_TOKEN}` }
			: undefined;

	const response = await fetch(target, {
		headers: requestHeaders
	});

	if (!response.ok) {
		throw error(response.status, 'Unable to load image');
	}

	const contentType = response.headers.get('content-type') ?? '';
	if (!contentType.startsWith('image/')) {
		throw error(415, 'Unsupported image type');
	}

	const source = Buffer.from(await response.arrayBuffer());

	if (contentType.includes('svg+xml') || contentType.includes('gif')) {
		return new Response(source, {
			headers: {
				'content-type': contentType,
				'cache-control': 'public, max-age=31536000, immutable'
			}
		});
	}

	const transformer = sharp(source).rotate().resize({
		width: MAX_WIDTH,
		withoutEnlargement: true
	});

	let output;
	let mimeType = contentType;

	if (contentType.includes('png')) {
		output = await transformer.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
		mimeType = 'image/png';
	} else if (contentType.includes('webp')) {
		output = await transformer.webp({ quality: 82 }).toBuffer();
		mimeType = 'image/webp';
	} else if (contentType.includes('avif')) {
		output = await transformer.avif({ quality: 60 }).toBuffer();
		mimeType = 'image/avif';
	} else {
		output = await transformer.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
		mimeType = 'image/jpeg';
	}

	return new Response(new Uint8Array(output), {
		headers: {
			'content-type': mimeType,
			'cache-control': 'public, max-age=31536000, immutable'
		}
	});
}
