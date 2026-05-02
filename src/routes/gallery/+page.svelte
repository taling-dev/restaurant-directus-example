<script lang="ts">
	import GalleryStrip from '$lib/components/content/GalleryStrip.svelte';
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Gallery | {data.site.name}</title>
	<meta name="description" content={`Gallery and atmosphere preview for ${data.site.name}.`} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto max-w-6xl space-y-6">
		<SectionHeading
			eyebrow="Gallery"
			title="A visual layer for dishes, cocktails, and room mood"
			copy="Use this page for plating updates, interior shots, chef moments, and social-first imagery that can be changed weekly."
			visualEditing={data.visualEditing}
			collection="site_settings"
			item={data.site.id}
			fields={['gallery_eyebrow', 'gallery_title', 'gallery_body']}
		/>
	</div>
</section>

<section class="px-6 py-10 pb-24 sm:px-8 lg:px-12 lg:py-12">
	<div class="mx-auto max-w-6xl">
		<GalleryStrip items={data.gallery} visualEditing={data.visualEditing} />
	</div>
</section>
