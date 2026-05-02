<script lang="ts">
	import type { SiteSettings } from '$lib/types/content';

	let { site }: { site: SiteSettings } = $props();

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/menu', label: 'Menu' },
		{ href: '/promos', label: 'Promos' },
		{ href: '/about', label: 'About' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-white/10 bg-stone-950/75 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
		<a class="flex min-w-0 items-center gap-4" href="/">
			<div
				class="flex size-11 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-sm font-semibold tracking-[0.3em] text-amber-300"
			>
				E&F
			</div>
			<div class="min-w-0">
				<p class="truncate text-lg font-semibold text-white">{site.name}</p>
				<p class="hidden truncate text-sm text-stone-400 sm:block">{site.tagline}</p>
			</div>
		</a>

		<nav class="hidden items-center gap-6 text-sm text-stone-300 lg:flex">
			{#each links as link (link.href)}
				<a class="hover:text-white" href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 sm:flex">
			<a class="btn-secondary" href={`tel:${site.phone.replace(/\s+/g, '')}`}>Call</a>
			<a class="btn-primary" href={site.reservationUrl}>Reserve</a>
		</div>
	</div>
</header>
