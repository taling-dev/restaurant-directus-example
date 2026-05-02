<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { GalleryItem } from '$lib/types/content';
	import { toAspectDimensions, toSizes, toSrcset } from '$lib/utils/image';

	let { items, visualEditing }: { items: GalleryItem[]; visualEditing: boolean } = $props();

	const galleryImageDimensions = toAspectDimensions(4 / 3);
</script>

<div class="grid [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] gap-4">
	{#each items as item, index (item.imageUrl)}
		<figure
			class={`panel-dark overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}
			data-directus={getDirectusAttr({
				enabled: visualEditing,
				collection: 'gallery_items',
				item: item.id,
				fields: ['image', 'alt_text', 'caption', 'sort'],
				mode: 'drawer'
			})}
		>
			<img
				class="aspect-[4/3] w-full object-cover"
				src={item.image || item.imageUrl}
				width={galleryImageDimensions.width}
				height={galleryImageDimensions.height}
				srcset={toSrcset(item.image || item.imageUrl, { ratio: 4 / 3 })}
				sizes={index === 0
					? toSizes({ md: '50vw', xl: '50vw' })
					: toSizes({ md: '50vw', xl: '25vw' })}
				alt={item.altText}
				loading="lazy"
				decoding="async"
			/>
			{#if item.caption}
				<figcaption class="px-4 py-4 text-sm leading-6 text-stone-300">{item.caption}</figcaption>
			{/if}
		</figure>
	{/each}
</div>
