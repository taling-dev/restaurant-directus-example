<script lang="ts">
	import GalleryStrip from '$lib/components/content/GalleryStrip.svelte';
	import PromoCard from '$lib/components/content/PromoCard.svelte';
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import { formatCurrency } from '$lib/utils/format';

	let { data } = $props();

	const heroSection = $derived(data.sections.find((section) => section.sectionType === 'hero'));
	const storySection = $derived(data.sections.find((section) => section.sectionType === 'story'));
	const contactSection = $derived(
		data.sections.find((section) => section.sectionType === 'contact-cta')
	);
	const heroAttr = $derived(
		heroSection
			? getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'homepage_sections',
					item: heroSection.id,
					fields: [
						'eyebrow',
						'title',
						'body',
						'cta_label',
						'cta_url',
						'secondary_label',
						'secondary_url',
						'image_url'
					],
					mode: 'drawer'
				})
			: getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: [
						'hero_badge',
						'hero_title',
						'hero_body',
						'hero_primary_label',
						'hero_primary_url',
						'hero_secondary_label',
						'hero_secondary_url'
					],
					mode: 'drawer'
				})
	);
	const storyAttr = $derived(
		storySection
			? getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'homepage_sections',
					item: storySection.id,
					fields: ['eyebrow', 'title', 'body'],
					mode: 'drawer'
				})
			: getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: ['story_heading', 'story_body'],
					mode: 'drawer'
				})
	);
	const contactAttr = $derived(
		contactSection
			? getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'homepage_sections',
					item: contactSection.id,
					fields: ['eyebrow', 'title', 'body', 'cta_label', 'cta_url'],
					mode: 'drawer'
				})
			: undefined
	);
</script>

<svelte:head>
	<title>{data.site.seoTitle}</title>
	<meta name="description" content={data.site.seoDescription} />
</svelte:head>

<section class="hero-frame border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
	<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
		<div class="space-y-8">
			<div class="space-y-4" data-directus={heroAttr}>
				<p class="section-kicker">{heroSection?.eyebrow ?? data.site.heroBadge}</p>
				<h1
					class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
				>
					{heroSection?.title ?? data.site.heroTitle}
				</h1>
				<p class="max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
					{heroSection?.body ?? data.site.heroBody}
				</p>
			</div>

			<div class="flex flex-wrap gap-4">
				<a class="btn-primary" href={heroSection?.ctaUrl ?? data.site.heroPrimaryUrl}>
					{heroSection?.ctaLabel ?? data.site.heroPrimaryLabel}
				</a>
				<a class="btn-secondary" href={heroSection?.secondaryUrl ?? data.site.heroSecondaryUrl}>
					{heroSection?.secondaryLabel ?? data.site.heroSecondaryLabel}
				</a>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				<div class="panel-dark">
					<p class="text-sm tracking-[0.25em] text-amber-300/80 uppercase">Today</p>
					<p class="mt-2 text-lg font-medium text-white">Fresh lunch and dinner service</p>
				</div>
				<div class="panel-dark">
					<p class="text-sm tracking-[0.25em] text-amber-300/80 uppercase">Signature</p>
					<p class="mt-2 text-lg font-medium text-white">Wood-fired mains and seasonal cocktails</p>
				</div>
				<div
					class="panel-dark"
					data-directus={getDirectusAttr({
						enabled: data.visualEditing,
						collection: 'site_settings',
						item: data.site.id,
						fields: ['location_note'],
						mode: 'popover'
					})}
				>
					<p class="text-sm tracking-[0.25em] text-amber-300/80 uppercase">Location</p>
					<p class="mt-2 text-lg font-medium text-white">{data.site.locationNote}</p>
				</div>
			</div>
		</div>

		<div
			class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 shadow-2xl shadow-amber-950/40"
			data-directus={heroAttr}
		>
			<img
				class="h-full min-h-[28rem] w-full object-cover"
				src={heroSection?.imageUrl ?? data.featuredItems[0]?.imageUrl}
				alt={heroSection?.title ?? data.site.heroTitle}
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"
			></div>
			<div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
				<p class="text-sm tracking-[0.25em] text-amber-300/80 uppercase">Chef's pick</p>
				<p class="mt-3 text-2xl font-semibold text-white">{data.featuredItems[0]?.name}</p>
				<p class="mt-2 max-w-sm text-sm leading-6 text-stone-200">
					{data.featuredItems[0]?.description}
				</p>
			</div>
		</div>
	</div>
</section>

<section class="px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
		<div class="space-y-4" data-directus={storyAttr}>
			<SectionHeading
				eyebrow={storySection?.eyebrow ?? 'Why guests return'}
				title={storySection?.title ?? data.site.storyHeading}
				copy={storySection?.body ?? data.site.storyBody}
			/>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each data.featuredItems as item (item.slug)}
				<article
					class="panel-dark flex h-full flex-col overflow-hidden"
					data-directus={getDirectusAttr({
						enabled: data.visualEditing,
						collection: 'menu_items',
						item: item.id,
						fields: ['name', 'description', 'price', 'promo_price', 'image_url', 'labels'],
						mode: 'drawer'
					})}
				>
					<img class="aspect-[4/3] w-full object-cover" src={item.imageUrl} alt={item.name} />
					<div class="flex flex-1 flex-col gap-4 p-5">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="text-xl font-semibold text-white">{item.name}</p>
								<p class="mt-2 text-sm leading-6 text-stone-300">{item.description}</p>
							</div>
							<p class="text-lg font-semibold text-amber-300">
								{formatCurrency(item.promoPrice ?? item.price, data.site.currencyCode)}
							</p>
						</div>
						<div class="mt-auto flex flex-wrap gap-2">
							{#each item.labels as label (label)}
								<span class="chip">{label}</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="border-y border-white/10 bg-stone-900/70 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto max-w-6xl space-y-10">
		<SectionHeading
			eyebrow="Current promos"
			title="Seasonal offers that keep the room buzzing"
			copy="Highlight tasting menus, cocktail hours, weekend brunches, and limited-time pairings directly from Directus."
		/>

		<div class="grid gap-6 lg:grid-cols-3">
			{#each data.promotions as promotion (promotion.slug)}
				<PromoCard {promotion} visualEditing={data.visualEditing} />
			{/each}
		</div>
	</div>
</section>

<section class="px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div class="space-y-5">
			<SectionHeading
				eyebrow="Menu structure"
				title="Built for fast edits, clear navigation, and table-side decisions"
				copy="Organize dishes by course, attach label chips for dietary notes, and feature best sellers across the homepage and menu page."
			/>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each data.categories as category (category.slug)}
					<div
						class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
						data-directus={getDirectusAttr({
							enabled: data.visualEditing,
							collection: 'menu_categories',
							item: category.id,
							fields: ['name', 'description'],
							mode: 'popover'
						})}
					>
						<p class="text-lg font-semibold text-white">{category.name}</p>
						<p class="mt-2 text-sm leading-6 text-stone-300">{category.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="panel-dark overflow-hidden p-0">
			<div class="grid gap-0 divide-y divide-white/10">
				{#each data.featuredItems as item (item.slug)}
					<div
						class="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
						data-directus={getDirectusAttr({
							enabled: data.visualEditing,
							collection: 'menu_items',
							item: item.id,
							fields: ['name', 'description', 'price', 'promo_price'],
							mode: 'popover'
						})}
					>
						<div>
							<p class="text-lg font-medium text-white">{item.name}</p>
							<p class="mt-1 text-sm text-stone-300">{item.description}</p>
						</div>
						<div class="shrink-0 text-right">
							<p class="text-lg font-semibold text-amber-300">
								{formatCurrency(item.promoPrice ?? item.price, data.site.currencyCode)}
							</p>
							<p class="mt-1 text-xs tracking-[0.25em] text-stone-500 uppercase">Featured</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="border-t border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto max-w-6xl space-y-8">
		<SectionHeading
			eyebrow="Gallery"
			title="Atmosphere, plating, and the little details that sell the experience"
			copy="Every gallery card can come from Directus so marketing updates feel as quick as a nightly special."
		/>
		<GalleryStrip items={data.gallery} visualEditing={data.visualEditing} />
	</div>
</section>

<section class="px-6 pt-4 pb-24 sm:px-8 lg:px-12">
	<div
		class="mx-auto max-w-6xl rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-400/10 via-amber-300/5 to-transparent px-8 py-10"
	>
		<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
			<div class="space-y-3" data-directus={contactAttr}>
				<p class="section-kicker">{contactSection?.eyebrow ?? 'Book the room'}</p>
				<h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					{contactSection?.title ??
						'Ready for date night, lunch service, or a private group booking?'}
				</h2>
				<p class="max-w-3xl text-base leading-7 text-stone-300">
					{contactSection?.body ??
						'Send guests directly to the reservation flow, phone line, or directions with one tap.'}
				</p>
			</div>
			<div class="flex flex-wrap gap-4">
				<a class="btn-primary" href={contactSection?.ctaUrl ?? data.site.reservationUrl}>
					{contactSection?.ctaLabel ?? 'Reserve a table'}
				</a>
				<a class="btn-secondary" href="/contact">Plan your visit</a>
			</div>
		</div>
	</div>
</section>
