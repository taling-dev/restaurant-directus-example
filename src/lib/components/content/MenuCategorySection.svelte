<script lang="ts">
	import type { MenuCategory, MenuItem, SiteSettings } from '$lib/types/content';
	import { formatCurrency } from '$lib/utils/format';

	let { category, items, site }: { category: MenuCategory; items: MenuItem[]; site: SiteSettings } =
		$props();
</script>

<section
	class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-6 lg:grid-cols-[0.4fr_0.6fr]"
>
	<div class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-900">
		<img class="aspect-square w-full object-cover" src={category.imageUrl} alt={category.name} />
	</div>
	<div class="space-y-6">
		<div class="space-y-3">
			<p class="section-kicker">{category.name}</p>
			<h2 class="text-3xl font-semibold tracking-tight text-white">{category.description}</h2>
		</div>

		<div class="space-y-4">
			{#each items as item (item.slug)}
				<article class="rounded-[1.25rem] border border-white/10 bg-black/10 p-4">
					<div class="flex items-start justify-between gap-4">
						<div class="space-y-2">
							<div class="flex flex-wrap items-center gap-2">
								<h3 class="text-xl font-semibold text-white">{item.name}</h3>
								{#if item.heatLevel > 0}
									<span class="chip">Heat {item.heatLevel}/3</span>
								{/if}
							</div>
							<p class="text-sm leading-6 text-stone-300">{item.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each item.labels as label (label)}
									<span class="chip">{label}</span>
								{/each}
							</div>
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
				</article>
			{/each}
		</div>
	</div>
</section>
