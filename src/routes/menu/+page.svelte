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
			eyebrow={data.site.menuEyebrow}
			title={data.site.menuTitle}
			copy={data.site.menuBody}
			visualEditing={data.visualEditing}
			collection="site_settings"
			item={data.site.id}
			fields={['menu_eyebrow', 'menu_title', 'menu_body']}
		/>
	</div>
</section>

<section class="px-6 py-10 pb-24 sm:px-8 lg:px-12 lg:py-12">
	<div class="mx-auto max-w-6xl space-y-8">
		{#each data.categories as category, index (category.slug)}
			<MenuCategorySection
				{category}
				items={data.items.filter((item) => item.categorySlug === category.slug)}
				priority={index === 0}
				site={data.site}
				visualEditing={data.visualEditing}
			/>
		{/each}
	</div>
</section>
