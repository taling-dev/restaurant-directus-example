<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { Promotion } from '$lib/types/content';
	import { formatPromotionWindow } from '$lib/utils/format';

	let { promotion, visualEditing }: { promotion: Promotion; visualEditing: boolean } = $props();
</script>

<article
	class="panel-dark overflow-hidden"
	data-directus={getDirectusAttr({
		enabled: visualEditing,
		collection: 'promotions',
		item: promotion.id,
		fields: [
			'title',
			'short_description',
			'full_description',
			'image',
			'start_date',
			'end_date',
			'cta_label',
			'cta_url',
			'featured',
			'active'
		],
		mode: 'drawer'
	})}
>
	<img
		class="aspect-[4/3] w-full object-cover"
		src={promotion.image || promotion.imageUrl}
		alt={promotion.title}
	/>
	<div class="space-y-4 p-5">
		<div>
			<p class="section-kicker">{formatPromotionWindow(promotion)}</p>
			<h3 class="mt-3 text-2xl font-semibold text-white">{promotion.title}</h3>
			<p class="mt-3 text-sm leading-6 text-stone-300">{promotion.shortDescription}</p>
		</div>
		<p class="text-sm leading-6 text-stone-400">{promotion.fullDescription}</p>
		{#if promotion.ctaUrl}
			<a class="btn-secondary w-full" href={promotion.ctaUrl}
				>{promotion.ctaLabel ?? 'Learn more'}</a
			>
		{/if}
	</div>
</article>
