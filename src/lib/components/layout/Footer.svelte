<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { BusinessHour, SiteSettings } from '$lib/types/content';
	import { formatServiceWindow } from '$lib/utils/format';

	let {
		site,
		hours,
		visualEditing
	}: { site: SiteSettings; hours: BusinessHour[]; visualEditing: boolean } = $props();
</script>

<footer class="border-t border-white/10 bg-stone-950/50 px-6 py-12 sm:px-8 lg:px-12">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
		<div
			class="space-y-4"
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['name', 'footer_note', 'address_lines'],
				mode: 'drawer'
			})}
		>
			<p class="text-2xl font-semibold text-white">{site.name}</p>
			<p class="max-w-lg text-sm leading-7 text-stone-300">{site.footerNote}</p>
			<div class="space-y-1 text-sm text-stone-400">
				{#each site.addressLines as line (line)}
					<p>{line}</p>
				{/each}
			</div>
		</div>

		<div>
			<p
				class="section-kicker"
				data-directus={getDirectusAttr({
					enabled: visualEditing,
					collection: 'site_settings',
					item: site.id,
					fields: ['hours_heading'],
					mode: 'popover'
				})}
			>
				{site.hoursHeading}
			</p>
			<div class="mt-4 space-y-3 text-sm text-stone-300">
				{#each hours as entry (entry.day)}
					<div
						class="flex items-start justify-between gap-4"
						data-directus={getDirectusAttr({
							enabled: visualEditing,
							collection: 'business_hours',
							item: entry.id,
							fields: ['day', 'open', 'close', 'closed', 'note'],
							mode: 'popover'
						})}
					>
						<span>{entry.day}</span>
						<div class="text-right">
							<p>{formatServiceWindow(entry)}</p>
							{#if entry.note}
								<p class="text-xs text-stone-500">{entry.note}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['phone', 'email', 'maps_url', 'socials', 'connect_heading', 'directions_label'],
				mode: 'drawer'
			})}
		>
			<p class="section-kicker">{site.connectHeading}</p>
			<div class="mt-4 space-y-3 text-sm text-stone-300">
				<p>
					<a class="hover:text-white" href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a
					>
				</p>
				<p><a class="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></p>
				<p><a class="hover:text-white" href={site.mapsUrl}>{site.directionsLabel}</a></p>
				<div class="flex flex-wrap gap-3 pt-2">
					{#each site.socials as social (social.url)}
						<a class="chip hover:border-amber-300/40 hover:text-white" href={social.url}
							>{social.label}</a
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</footer>
