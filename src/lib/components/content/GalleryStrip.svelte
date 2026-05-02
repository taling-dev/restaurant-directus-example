<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import type { GalleryItem } from '$lib/types/content';
	import { toSrcset } from '$lib/utils/image';

	let { items, visualEditing }: { items: GalleryItem[]; visualEditing: boolean } = $props();
</script>

<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
				srcset={toSrcset(item.image || item.imageUrl)}
				sizes={index === 0
					? '(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw'
					: '(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw'}
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
