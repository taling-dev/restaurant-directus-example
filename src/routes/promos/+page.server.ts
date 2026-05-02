import { getPromotions } from '$lib/server/content';

export async function load() {
	return {
		promotions: await getPromotions()
	};
}
