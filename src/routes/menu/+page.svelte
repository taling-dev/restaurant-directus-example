<script lang="ts">
	import MenuCategorySection from '$lib/components/content/MenuCategorySection.svelte';
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Menu | {data.site.name}</title>
	<meta name="description" content={`Explore the menu at ${data.site.name}.`} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto max-w-6xl space-y-6">
		<SectionHeading
			eyebrow="Menu"
			title="Organized for quick scanning on phones and better merchandising on larger screens"
			copy="Each category and item can be edited from Directus without changing the page structure or layout code."
		/>
	</div>
</section>

<section class="px-6 py-10 pb-24 sm:px-8 lg:px-12 lg:py-12">
	<div class="mx-auto max-w-6xl space-y-8">
		{#each data.categories as category (category.slug)}
			<MenuCategorySection
				{category}
				items={data.items.filter((item) => item.categorySlug === category.slug)}
				site={data.site}
			/>
		{/each}
	</div>
</section>
