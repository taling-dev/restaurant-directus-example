<script lang="ts">
	import type { GalleryItem } from '$lib/types/content';

	let { items }: { items: GalleryItem[] } = $props();
</script>

<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
	{#each items as item, index (item.imageUrl)}
		<figure class={`panel-dark overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
			<img class="aspect-[4/3] w-full object-cover" src={item.imageUrl} alt={item.altText} />
			{#if item.caption}
				<figcaption class="px-4 py-4 text-sm leading-6 text-stone-300">{item.caption}</figcaption>
			{/if}
		</figure>
	{/each}
</div>
