<script lang="ts">
	import { getDirectusAttr, withVisualEditingHref } from '$lib/directus/visual-editing';
	import type { Promotion } from '$lib/types/content';
	import { formatPromotionWindow } from '$lib/utils/format';
	import { CARD_WIDTHS, toSizes, toSrcset } from '$lib/utils/image';

	let {
		promotion,
		visualEditing,
		defaultLabel
	}: {
		promotion: Promotion;
		visualEditing: boolean;
		defaultLabel: string;
	} = $props();

	const promoImageDimensions = { width: 1200, height: 900 };
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
	<div class="aspect-[4/3] overflow-hidden">
		<img
			class="h-full w-full object-cover"
			src={promotion.image || promotion.imageUrl}
			width={promoImageDimensions.width}
			height={promoImageDimensions.height}
			srcset={toSrcset(promotion.image || promotion.imageUrl, { widths: CARD_WIDTHS })}
			sizes={toSizes({ sm: '50vw', lg: '30vw' })}
			alt={promotion.title}
			loading="lazy"
			decoding="async"
		/>
	</div>
	<div class="space-y-4 p-5">
		<div>
			<p class="section-kicker">{formatPromotionWindow(promotion)}</p>
			<h3 class="mt-3 text-2xl font-semibold text-white">{promotion.title}</h3>
			<p class="mt-3 text-sm leading-6 text-stone-300">{promotion.shortDescription}</p>
		</div>
		<p class="text-sm leading-6 text-stone-400">{promotion.fullDescription}</p>
		{#if promotion.ctaUrl}
			<a class="btn-secondary w-full" href={withVisualEditingHref(promotion.ctaUrl, visualEditing)}
				>{promotion.ctaLabel ?? defaultLabel}</a
			>
		{/if}
	</div>
</article>
