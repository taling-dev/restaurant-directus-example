import { getGalleryItems } from '$lib/server/content';

export async function load() {
	return {
		gallery: await getGalleryItems()
	};
}
