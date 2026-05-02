<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { SiteSettings } from '$lib/types/content';

	let { site, visualEditing }: { site: SiteSettings; visualEditing: boolean } = $props();
</script>

<header class="sticky top-0 z-40 border-b border-white/10 bg-stone-950/75 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
		<a class="flex min-w-0 items-center gap-4" href="/">
			{#if site.logo}
				<img class="size-11 rounded-full object-cover" src={site.logo} alt={site.name} />
			{:else}
				<div
					class="flex size-11 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-sm font-semibold tracking-[0.3em] text-amber-300"
				>
					E&F
				</div>
			{/if}
			<div
				class="min-w-0"
				data-directus={getDirectusAttr({
					enabled: visualEditing,
					collection: 'site_settings',
					item: site.id,
					fields: ['name', 'tagline', 'logo'],
					mode: 'popover'
				})}
			>
				<p class="truncate text-lg font-semibold text-white">{site.name}</p>
				<p class="hidden truncate text-sm text-stone-400 sm:block">{site.tagline}</p>
			</div>
		</a>

		<nav
			class="hidden items-center gap-6 text-sm text-stone-300 lg:flex"
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'site_settings',
				item: site.id,
				fields: ['nav_links'],
				mode: 'popover'
			})}
		>
			{#each site.navLinks as link (link.url)}
				<a class="hover:text-white" href={link.url}>{link.label}</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 sm:flex">
			<a
				class="btn-secondary"
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
				class="btn-primary"
				href={site.reservationUrl}
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
</header>
