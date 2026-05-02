<script lang="ts">
	import VisualEditing from '$lib/components/directus/VisualEditing.svelte';
	import './layout.css';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import FloatingActions from '$lib/components/layout/FloatingActions.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { data, children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<VisualEditing enabled={data.visualEditing} directusUrl={data.directusUrl} />

<div class="min-h-screen bg-stone-950 text-stone-100">
	<Header site={data.site} visualEditing={data.visualEditing} />
	<main>{@render children()}</main>
	<Footer site={data.site} hours={data.hours} visualEditing={data.visualEditing} />
	<FloatingActions site={data.site} visualEditing={data.visualEditing} />
</div>
