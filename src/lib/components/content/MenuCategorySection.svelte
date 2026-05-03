<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { MenuCategory, MenuItem, SiteSettings } from '$lib/types/content';
	import { formatCurrency } from '$lib/utils/format';
	import { toAspectDimensions, toSizes, toSrcset } from '$lib/utils/image';

	let {
		category,
		items,
		site,
		priority = false,
		visualEditing
	}: {
		category: MenuCategory;
		items: MenuItem[];
		priority?: boolean;
		site: SiteSettings;
		visualEditing: boolean;
	} = $props();

	const categoryImageDimensions = toAspectDimensions(1);
	const menuItemImageDimensions = toAspectDimensions(4 / 3);
</script>

<section
	class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 [contain-intrinsic-size:800px] [content-visibility:auto] sm:p-6 lg:grid-cols-[0.4fr_0.6fr]"
>
	<div
		class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-900"
		data-directus={getDirectusAttr({
			enabled: visualEditing,
			collection: 'menu_categories',
			item: category.id,
			fields: ['name', 'description', 'image'],
			mode: 'drawer'
		})}
	>
		<img
			class="aspect-square w-full object-cover"
			src={category.image || category.imageUrl}
			width={categoryImageDimensions.width}
			height={categoryImageDimensions.height}
			srcset={toSrcset(category.image || category.imageUrl, { ratio: 1 })}
			sizes={toSizes({ lg: '35vw' })}
			alt={category.name}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding="async"
		/>
	</div>
	<div class="space-y-6">
		<div class="space-y-3">
			<p class="section-kicker">{category.name}</p>
			<h2 class="text-3xl font-semibold tracking-tight text-white">{category.description}</h2>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			{#each items as item (item.slug)}
				<article
					class="overflow-hidden rounded-2xl border border-white/10 bg-stone-900/40"
					data-directus={getDirectusAttr({
						enabled: visualEditing,
						collection: 'menu_items',
						item: item.id,
						fields: [
							'name',
							'description',
							'price',
							'promo_price',
							'image',
							'image_url',
							'labels',
							'heat_level',
							'featured',
							'chef_pick',
							'available'
						],
						mode: 'drawer'
					})}
				>
					{#if item.image || item.imageUrl}
						<img
							class="aspect-[4/3] w-full object-cover"
							src={item.image || item.imageUrl}
							width={menuItemImageDimensions.width}
							height={menuItemImageDimensions.height}
							srcset={toSrcset(item.image || item.imageUrl, { ratio: 4 / 3 })}
							sizes={toSizes({ md: '50vw', lg: '30vw' })}
							alt={item.name}
							loading="lazy"
							fetchpriority="auto"
							decoding="async"
						/>
					{/if}
					<div class="space-y-4 p-5">
						<div class="flex items-start justify-between gap-4">
							<div class="space-y-2">
								<div class="flex flex-wrap items-center gap-2">
									<h3 class="text-xl font-semibold text-white">{item.name}</h3>
									{#if item.heatLevel > 0}
										<span class="chip">Heat {item.heatLevel}/3</span>
									{/if}
								</div>
								<p class="text-sm leading-6 text-stone-300">{item.description}</p>
							</div>
							<div class="shrink-0 text-right">
								{#if item.promoPrice}
									<p class="text-sm text-stone-500 line-through">
										{formatCurrency(item.price, site.currencyCode)}
									</p>
								{/if}
								<p class="text-xl font-semibold text-amber-300">
									{formatCurrency(item.promoPrice ?? item.price, site.currencyCode)}
								</p>
							</div>
						</div>
						<div class="flex flex-wrap gap-2">
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
