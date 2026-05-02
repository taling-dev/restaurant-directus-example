<script lang="ts">
	import PromoCard from '$lib/components/content/PromoCard.svelte';
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Promos | {data.site.name}</title>
	<meta name="description" content={`Current promotions and specials at ${data.site.name}.`} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto max-w-6xl space-y-6">
		<SectionHeading
			eyebrow="Promos"
			title="Time-bound campaigns that can go live or expire without a redeploy"
			copy="This page is designed for brunch launches, private dining pushes, cocktail windows, and seasonal menu moments."
		/>
	</div>
</section>

<section class="px-6 py-10 pb-24 sm:px-8 lg:px-12 lg:py-12">
	<div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each data.promotions as promotion (promotion.slug)}
			<PromoCard {promotion} visualEditing={data.visualEditing} />
		{/each}
	</div>
</section>
