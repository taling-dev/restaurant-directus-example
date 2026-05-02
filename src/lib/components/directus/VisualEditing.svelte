<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { apply } from '@directus/visual-editing';
	import { onMount, tick } from 'svelte';

	let { enabled, directusUrl }: { enabled: boolean; directusUrl: string } = $props();

	onMount(() => {
		if (!browser) {
			return;
		}

		let removeOverlays: (() => void) | undefined;
		let cancelled = false;
		let runId = 0;

		const initialize = async () => {
			runId += 1;
			const currentRunId = runId;

			removeOverlays?.();
			removeOverlays = undefined;

			if (!enabled || !directusUrl) {
				return;
			}

			await tick();

			try {
				const controls = await apply({
					directusUrl: directusUrl.replace(/\/$/, ''),
					onSaved: () => window.location.reload()
				});

				if (!controls) {
					return;
				}

				const { remove } = controls;

				if (cancelled || currentRunId !== runId) {
					remove();
					return;
				}

				removeOverlays = remove;
			} catch (error) {
				console.warn('Directus visual editing failed to initialize.', error);
			}
		};

		void initialize();

		afterNavigate(() => {
			void initialize();
		});

		return () => {
			cancelled = true;
			runId += 1;
			removeOverlays?.();
		};
	});
</script>
