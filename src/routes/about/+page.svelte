<script lang="ts">
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>About | {data.site.name}</title>
	<meta name="description" content={data.site.aboutBody} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
		<div class="space-y-6">
			<SectionHeading eyebrow="About" title={data.site.aboutTitle} copy={data.site.aboutBody} />
			<p class="max-w-2xl text-base leading-7 text-stone-300">
				This implementation keeps the visual system in SvelteKit while the editable restaurant
				details move into Directus over time, starting with menus, promos, hours, and homepage
				messaging.
			</p>
		</div>

		<div class="panel-dark overflow-hidden">
			<img
				class="aspect-[4/3] w-full object-cover"
				src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80"
				alt="Dining room interior"
			/>
		</div>
	</div>
</section>

<section class="px-6 py-16 pb-24 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
		<div class="panel-dark p-6">
			<p class="section-kicker">CMS-ready</p>
			<p class="mt-4 text-lg leading-7 text-white">
				Swap hero copy, homepage blocks, and contact details from structured content.
			</p>
		</div>
		<div class="panel-dark p-6">
			<p class="section-kicker">Restaurant-first</p>
			<p class="mt-4 text-lg leading-7 text-white">
				Layouts prioritize menu legibility, promo urgency, and reservation conversion.
			</p>
		</div>
		<div class="panel-dark p-6">
			<p class="section-kicker">Operational fit</p>
			<p class="mt-4 text-lg leading-7 text-white">
				Demo content fallback keeps the frontend usable while Directus gets populated.
			</p>
		</div>
	</div>
</section>
