import { env as publicEnv } from '$env/dynamic/public';
import { getBusinessHours, getSiteSettings } from '$lib/server/content';

export async function load({ url }) {
	const [site, hours] = await Promise.all([getSiteSettings(), getBusinessHours()]);

	return {
		site,
		hours,
		visualEditing: url.searchParams.get('visual-editing') === 'true',
		directusUrl: publicEnv.PUBLIC_DIRECTUS_URL ?? ''
	};
}
