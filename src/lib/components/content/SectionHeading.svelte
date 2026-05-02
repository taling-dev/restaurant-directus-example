<script lang="ts">
	let { eyebrow, title, copy }: { eyebrow: string; title: string; copy: string } = $props();
</script>

<div class="space-y-4">
	<p class="section-kicker">{eyebrow}</p>
	<h2 class="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
		{title}
	</h2>
	<p class="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">{copy}</p>
</div>
