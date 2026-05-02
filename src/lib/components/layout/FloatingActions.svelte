<script lang="ts">
	import type { SiteSettings } from '$lib/types/content';

	let { site }: { site: SiteSettings } = $props();
</script>

<div class="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
	<div
		class="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-full border border-white/10 bg-stone-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur"
	>
		<a
			class="rounded-full bg-white/5 px-3 py-3 text-center text-xs font-semibold text-white"
			href={`tel:${site.phone.replace(/\s+/g, '')}`}>Call</a
		>
		<a
			class="rounded-full bg-white/5 px-3 py-3 text-center text-xs font-semibold text-white"
			href={site.mapsUrl}>Map</a
		>
		<a
			class="rounded-full bg-amber-300 px-3 py-3 text-center text-xs font-semibold text-stone-950"
			href={site.reservationUrl}>Reserve</a
		>
	</div>
</div>
