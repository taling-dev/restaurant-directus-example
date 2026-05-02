<script lang="ts">
	import './layout.css';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import FloatingActions from '$lib/components/layout/FloatingActions.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { data, children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-stone-950 text-stone-100">
	<Header site={data.site} />
	<main>{@render children()}</main>
	<Footer site={data.site} hours={data.hours} />
	<FloatingActions site={data.site} />
</div>
