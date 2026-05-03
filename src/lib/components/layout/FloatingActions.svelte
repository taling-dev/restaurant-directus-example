<script lang="ts">
	import { getDirectusAttr, withVisualEditingHref } from '$lib/directus/visual-editing';
	import type { SiteSettings } from '$lib/types/content';

	let { site, visualEditing }: { site: SiteSettings; visualEditing: boolean } = $props();
</script>

<div class="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
	<div
		class="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-full border border-white/10 bg-stone-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur"
	>
		<a
			class="rounded-full bg-white/5 px-3 py-3 text-center text-xs font-semibold text-white"
			href={`tel:${site.phone.replace(/\s+/g, '')}`}
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['phone', 'call_label'],
				mode: 'popover'
			})}>{site.callLabel}</a
		>
		<a
			class="rounded-full bg-white/5 px-3 py-3 text-center text-xs font-semibold text-white"
			href={withVisualEditingHref(site.mapsUrl, visualEditing)}
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['maps_url', 'map_label'],
				mode: 'popover'
			})}>{site.mapLabel}</a
		>
		<a
			class="rounded-full bg-amber-300 px-3 py-3 text-center text-xs font-semibold text-black"
			href={withVisualEditingHref(site.reservationUrl, visualEditing)}
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['reservation_url', 'reserve_label'],
				mode: 'popover'
			})}>{site.reserveLabel}</a
		>
	</div>
</div>
