<script lang="ts">
	import { browser } from '$app/environment';
	import { apply } from '@directus/visual-editing';
	import { onMount } from 'svelte';

	let { enabled, directusUrl }: { enabled: boolean; directusUrl: string } = $props();

	onMount(() => {
		if (!browser || !enabled || !directusUrl) {
			return;
		}

		let removeOverlays: (() => void) | undefined;
		let cancelled = false;

		void (async () => {
			try {
				const controls = await apply({
					directusUrl: directusUrl.replace(/\/$/, ''),
					onSaved: () => window.location.reload()
				});

				if (!controls) {
					return;
				}

				const { remove } = controls;

				if (cancelled) {
					remove();
					return;
				}

				removeOverlays = remove;
			} catch (error) {
				console.warn('Directus visual editing failed to initialize.', error);
			}
		})();

		return () => {
			cancelled = true;
			removeOverlays?.();
		};
	});
</script>
