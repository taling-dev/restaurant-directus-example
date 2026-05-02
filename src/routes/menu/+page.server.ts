import { getMenuCategories, getMenuItems } from '$lib/server/content';

export async function load() {
	const categories = await getMenuCategories();
	const items = await getMenuItems(categories);

	return { categories, items };
}
