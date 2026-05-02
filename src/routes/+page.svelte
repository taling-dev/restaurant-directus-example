<script lang="ts">
	import GalleryStrip from '$lib/components/content/GalleryStrip.svelte';
	import PromoCard from '$lib/components/content/PromoCard.svelte';
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';
	import { getDirectusAttr, withVisualEditingHref } from '$lib/directus/visual-editing';
	import { formatCurrency } from '$lib/utils/format';
	import { toSizes, toSrcset } from '$lib/utils/image';

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
					fields: ['eyebrow', 'title', 'body', 'cta_label', 'cta_url', 'image'],
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
						'hero_secondary_url',
						'hero_image'
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
					fields: ['eyebrow', 'title', 'body', 'image'],
					mode: 'drawer'
				})
			: getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: ['story_eyebrow', 'story_heading', 'story_body'],
					mode: 'drawer'
				})
	);
	const contactAttr = $derived(
		contactSection
			? getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'homepage_sections',
					item: contactSection.id,
					fields: ['eyebrow', 'title', 'body', 'cta_label', 'cta_url', 'image'],
					mode: 'drawer'
				})
			: getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: [
						'contact_cta_eyebrow',
						'contact_cta_title',
						'contact_cta_body',
						'contact_cta_button_label',
						'plan_visit_label'
					],
					mode: 'drawer'
				})
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
				<a
					class="btn-primary"
					href={withVisualEditingHref(
						heroSection?.ctaUrl ?? data.site.heroPrimaryUrl,
						data.visualEditing
					)}
				>
					{heroSection?.ctaLabel ?? data.site.heroPrimaryLabel}
				</a>
				<a
					class="btn-secondary"
					href={withVisualEditingHref(
						heroSection?.secondaryUrl ?? data.site.heroSecondaryUrl,
						data.visualEditing
					)}
				>
					{heroSection?.secondaryLabel ?? data.site.heroSecondaryLabel}
				</a>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each data.site.statsCards as card (card.label)}
					<div
						class="panel-dark"
						data-directus={getDirectusAttr({
							enabled: data.visualEditing,
							collection: 'site_settings',
							item: data.site.id,
							fields: ['stats_cards'],
							mode: 'popover'
						})}
					>
						<p class="text-sm tracking-[0.25em] text-amber-300/80 uppercase">{card.label}</p>
						<p class="mt-2 text-lg font-medium text-white">{card.title}</p>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 shadow-2xl shadow-amber-950/40"
			data-directus={heroAttr}
		>
			<img
				class="h-full min-h-[28rem] w-full object-cover"
				src={heroSection?.image ||
					heroSection?.imageUrl ||
					data.site.heroImage ||
					data.featuredItems[0]?.imageUrl}
				srcset={toSrcset(
					heroSection?.image ||
						heroSection?.imageUrl ||
						data.site.heroImage ||
						data.featuredItems[0]?.imageUrl
				)}
				sizes={toSizes({ lg: '40vw' })}
				alt={heroSection?.title ?? data.site.heroTitle}
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"
			></div>
			<div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
				<p
					class="text-sm tracking-[0.25em] text-amber-300/80 uppercase"
					data-directus={getDirectusAttr({
						enabled: data.visualEditing,
						collection: 'site_settings',
						item: data.site.id,
						fields: ['chef_pick_label', 'chef_pick_item_slug'],
						mode: 'popover'
					})}
				>
					{data.site.chefPickLabel}
				</p>
				{#if data.featuredItems.find((i) => i.slug === data.site.chefPickItemSlug)}
					{@const pick = data.featuredItems.find((i) => i.slug === data.site.chefPickItemSlug)}
					<p class="mt-3 text-2xl font-semibold text-white">{pick?.name}</p>
					<p class="mt-2 max-w-sm text-sm leading-6 text-stone-200">{pick?.description}</p>
				{:else}
					<p class="mt-3 text-2xl font-semibold text-white">{data.featuredItems[0]?.name}</p>
					<p class="mt-2 max-w-sm text-sm leading-6 text-stone-200">
						{data.featuredItems[0]?.description}
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
		<div class="space-y-4" data-directus={storyAttr}>
			<SectionHeading
				eyebrow={storySection?.eyebrow ?? data.site.storyEyebrow}
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
						fields: ['name', 'description', 'price', 'promo_price', 'image', 'image_url', 'labels'],
						mode: 'drawer'
					})}
				>
					<img
						class="aspect-[4/3] w-full object-cover"
						src={item.image || item.imageUrl}
						srcset={toSrcset(item.image || item.imageUrl)}
						sizes={toSizes({ sm: '50vw', lg: '28vw' })}
						alt={item.name}
						loading="eager"
						fetchpriority="high"
						decoding="async"
					/>
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

<section
	class="border-y border-white/10 bg-black/20 px-6 py-16 [contain-intrinsic-size:900px] [content-visibility:auto] sm:px-8 lg:px-12 lg:py-20"
>
	<div class="mx-auto max-w-6xl space-y-8">
		<SectionHeading
			eyebrow={data.site.homeCardsEyebrow}
			title={data.site.homeCardsTitle}
			copy={data.site.homeCardsBody}
			visualEditing={data.visualEditing}
			collection="site_settings"
			item={data.site.id}
			fields={['home_cards_eyebrow', 'home_cards_title', 'home_cards_body']}
		/>

		<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
			{#each data.site.homeCards as card, index (`${card.title}-${index}`)}
				<article
					class="panel-dark flex h-full flex-col gap-4"
					data-directus={getDirectusAttr({
						enabled: data.visualEditing,
						collection: 'site_settings',
						item: data.site.id,
						fields: ['home_cards'],
						mode: 'drawer'
					})}
				>
					{#if card.eyebrow}
						<p class="section-kicker">{card.eyebrow}</p>
					{/if}
					<h3 class="text-2xl font-semibold text-white">{card.title}</h3>
					<p class="text-sm leading-7 text-stone-300">{card.body}</p>
					{#if card.ctaUrl}
						<div class="mt-auto pt-2">
							<a
								class="btn-secondary"
								href={withVisualEditingHref(card.ctaUrl, data.visualEditing)}
							>
								{card.ctaLabel ?? data.site.learnMoreLabel}
							</a>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<section
	class="border-y border-white/10 bg-stone-900/70 px-6 py-16 [contain-intrinsic-size:800px] [content-visibility:auto] sm:px-8 lg:px-12 lg:py-20"
>
	<div class="mx-auto max-w-6xl space-y-10">
		<SectionHeading
			eyebrow={data.site.promosEyebrow}
			title={data.site.promosTitle}
			copy={data.site.promosBody}
			visualEditing={data.visualEditing}
			collection="site_settings"
			item={data.site.id}
			fields={['promos_eyebrow', 'promos_title', 'promos_body']}
		/>

		<div class="grid gap-6 lg:grid-cols-3">
			{#each data.promotions as promotion (promotion.slug)}
				<PromoCard
					{promotion}
					visualEditing={data.visualEditing}
					defaultLabel={data.site.learnMoreLabel}
				/>
			{/each}
		</div>
	</div>
</section>

<section
	class="px-6 py-16 [contain-intrinsic-size:1000px] [content-visibility:auto] sm:px-8 lg:px-12 lg:py-20"
>
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div class="space-y-5">
			<SectionHeading
				eyebrow={data.site.menuEyebrow}
				title={data.site.menuTitle}
				copy={data.site.menuBody}
				visualEditing={data.visualEditing}
				collection="site_settings"
				item={data.site.id}
				fields={['menu_eyebrow', 'menu_title', 'menu_body']}
			/>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each data.categories as category (category.slug)}
					<div
						class="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
						data-directus={getDirectusAttr({
							enabled: data.visualEditing,
							collection: 'menu_categories',
							item: category.id,
							fields: ['name', 'description', 'image', 'image_url'],
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
							fields: ['name', 'description', 'price', 'promo_price', 'featured'],
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
							<p
								class="mt-1 text-xs tracking-[0.25em] text-stone-500 uppercase"
								data-directus={getDirectusAttr({
									enabled: data.visualEditing,
									collection: 'site_settings',
									item: data.site.id,
									fields: ['featured_label'],
									mode: 'popover'
								})}
							>
								{data.site.featuredLabel}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section
	class="border-t border-white/10 px-6 py-16 [contain-intrinsic-size:700px] [content-visibility:auto] sm:px-8 lg:px-12 lg:py-20"
>
	<div class="mx-auto max-w-6xl space-y-8">
		<SectionHeading
			eyebrow={data.site.galleryEyebrow}
			title={data.site.galleryTitle}
			copy={data.site.galleryBody}
			visualEditing={data.visualEditing}
			collection="site_settings"
			item={data.site.id}
			fields={['gallery_eyebrow', 'gallery_title', 'gallery_body']}
		/>
		<GalleryStrip items={data.gallery} visualEditing={data.visualEditing} />
	</div>
</section>

<section
	class="px-6 pt-4 pb-24 [contain-intrinsic-size:500px] [content-visibility:auto] sm:px-8 lg:px-12"
>
	<div
		class="mx-auto max-w-6xl rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-400/10 via-amber-300/5 to-transparent px-8 py-10"
	>
		<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
			<div class="space-y-3" data-directus={contactAttr}>
				<p class="section-kicker">{contactSection?.eyebrow ?? data.site.contactCtaEyebrow}</p>
				<h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					{contactSection?.title ?? data.site.contactCtaTitle}
				</h2>
				<p class="max-w-3xl text-base leading-7 text-stone-300">
					{contactSection?.body ?? data.site.contactCtaBody}
				</p>
			</div>
			<div class="flex flex-wrap gap-4">
				<a
					class="btn-primary"
					href={withVisualEditingHref(
						contactSection?.ctaUrl ?? data.site.reservationUrl,
						data.visualEditing
					)}
				>
					{contactSection?.ctaLabel ?? data.site.contactCtaButtonLabel}
				</a>
				<a
					class="btn-secondary"
					href={withVisualEditingHref('/contact', data.visualEditing)}
					data-directus={getDirectusAttr({
						enabled: data.visualEditing,
						collection: 'site_settings',
						item: data.site.id,
						fields: ['plan_visit_label'],
						mode: 'popover'
					})}
				>
					{data.site.planVisitLabel}
				</a>
			</div>
		</div>
	</div>
</section>
