<script lang="ts">
	import { getDirectusAttr } from '$lib/directus/visual-editing';

	let {
		eyebrow,
		title,
		copy,
		visualEditing = false,
		collection,
		item,
		fields
	}: {
		eyebrow: string;
		title: string;
		copy: string;
		visualEditing?: boolean;
		collection?: string;
		item?: string;
		fields?: string[];
	} = $props();
</script>

<div
	class="space-y-4"
	data-directus={collection && item && fields
		? getDirectusAttr({ enabled: visualEditing, collection, item, fields, mode: 'popover' })
		: undefined}
>
	<p class="section-kicker">{eyebrow}</p>
	<h2 class="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
		{title}
	</h2>
	<p class="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">{copy}</p>
</div>
