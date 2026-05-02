<script lang="ts">
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';
	import { getDirectusAttr } from '$lib/directus/visual-editing';

	let { data } = $props();
</script>

<svelte:head>
	<title>About | {data.site.name}</title>
	<meta name="description" content={data.site.aboutBody} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
		<div
			class="space-y-6"
			data-directus={getDirectusAttr({
				enabled: data.visualEditing,
				collection: 'site_settings',
				item: data.site.id,
				fields: ['about_eyebrow', 'about_title', 'about_body', 'about_extra'],
				mode: 'drawer'
			})}
		>
			<SectionHeading
				eyebrow={data.site.aboutEyebrow}
				title={data.site.aboutTitle}
				copy={data.site.aboutBody}
			/>
			{#if data.site.aboutExtra}
				<p class="max-w-2xl text-base leading-7 text-stone-300">{data.site.aboutExtra}</p>
			{/if}
		</div>

		<div
			class="panel-dark overflow-hidden"
			data-directus={getDirectusAttr({
				enabled: data.visualEditing,
				collection: 'site_settings',
				item: data.site.id,
				fields: ['about_image'],
				mode: 'popover'
			})}
		>
		<img
			class="aspect-[4/3] w-full object-cover"
			src={data.site.aboutImage}
			alt="Dining room interior"
			loading="lazy"
			decoding="async"
		/>
		</div>
	</div>
</section>

<section class="px-6 py-16 pb-24 sm:px-8 lg:px-12 lg:py-20 [content-visibility:auto] [contain-intrinsic-size:600px]">
	<div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
		{#each data.site.aboutCards as card (card.label)}
			<div
				class="panel-dark p-6"
				data-directus={getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: ['about_cards'],
					mode: 'popover'
				})}
			>
				<p class="section-kicker">{card.label}</p>
				<p class="mt-4 text-base leading-7 text-stone-300">{card.body}</p>
			</div>
		{/each}
	</div>
</section>
