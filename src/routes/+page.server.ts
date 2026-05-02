import { getHomePageData } from '$lib/server/content';

export async function load() {
	return getHomePageData();
}
