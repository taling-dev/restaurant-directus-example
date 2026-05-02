import { getBusinessHours, getSiteSettings } from '$lib/server/content';

export async function load() {
	const [site, hours] = await Promise.all([getSiteSettings(), getBusinessHours()]);

	return { site, hours };
}
