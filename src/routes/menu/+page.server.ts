import { getMenuCategories, getMenuItems } from '$lib/server/content';

export async function load() {
	const [categories, items] = await Promise.all([getMenuCategories(), getMenuItems()]);

	return { categories, items };
}
