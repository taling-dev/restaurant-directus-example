<script lang="ts">
	import { getDirectusAttr, withVisualEditingHref } from '$lib/directus/visual-editing';
	import type { SiteSettings } from '$lib/types/content';
	import { toAspectDimensions, toSizes, toSrcset } from '$lib/utils/image';

	let { site, visualEditing }: { site: SiteSettings; visualEditing: boolean } = $props();

	let mobileOpen = $state(false);

	const logoDimensions = toAspectDimensions(1, 44);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<header class="sticky top-0 z-40 border-b border-white/10 bg-stone-950/75 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
		<a class="flex min-w-0 items-center gap-4" href={withVisualEditingHref('/', visualEditing)}>
			{#if site.logo}
				<img
					class="size-11 rounded-full object-cover"
					src={site.logo}
					width={logoDimensions.width}
					height={logoDimensions.height}
					srcset={toSrcset(site.logo, { widths: [44, 88, 132] })}
					sizes={toSizes({ mobile: '44px' })}
					alt={site.name}
					loading="eager"
					fetchpriority="high"
					decoding="async"
				/>
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
				<a class="hover:text-white" href={withVisualEditingHref(link.url, visualEditing)}
					>{link.label}</a
				>
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

		<button
			class="flex size-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 lg:hidden"
			onclick={toggleMobile}
			aria-label="Toggle navigation"
			aria-expanded={mobileOpen}
		>
			<span class="block h-0.5 w-5 bg-white transition-transform {mobileOpen ? 'translate-y-2 rotate-45' : ''}"></span>
			<span class="block h-0.5 w-5 bg-white transition-opacity {mobileOpen ? 'opacity-0' : ''}"></span>
			<span class="block h-0.5 w-5 bg-white transition-transform {mobileOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
		</button>
	</div>

	{#if mobileOpen}
		<div
			class="border-b border-white/10 bg-stone-950/95 px-6 py-4 backdrop-blur-xl lg:hidden"
		>
			<nav class="flex flex-col gap-3 text-sm text-stone-300">
				{#each site.navLinks as link (link.url)}
					<a
						class="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
						href={withVisualEditingHref(link.url, visualEditing)}
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
				<div class="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
					<a
						class="btn-secondary text-center"
						href={`tel:${site.phone.replace(/\s+/g, '')}`}
						 onclick={closeMobile}
					>
						{site.callLabel}
					</a>
					<a
						class="btn-primary text-center"
						href={withVisualEditingHref(site.reservationUrl, visualEditing)}
						onclick={closeMobile}
					>
						{site.reserveLabel}
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>
