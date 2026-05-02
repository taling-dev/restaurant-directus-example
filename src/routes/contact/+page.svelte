<script lang="ts">
	import SectionHeading from '$lib/components/content/SectionHeading.svelte';
	import { getDirectusAttr } from '$lib/directus/visual-editing';
	import { formatServiceWindow } from '$lib/utils/format';

	let { data } = $props();
</script>

<svelte:head>
	<title>Contact | {data.site.name}</title>
	<meta name="description" content={`Visit ${data.site.name}, view hours, and get directions.`} />
</svelte:head>

<section class="border-b border-white/10 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
		<div class="space-y-6">
			<SectionHeading
				eyebrow="Contact"
				title="Make the visit feel easy before the guest even leaves home"
				copy="Address, phone, reservation links, and service windows stay visible and easy to update from the CMS."
				visualEditing={data.visualEditing}
				collection="site_settings"
				item={data.site.id}
				fields={['contact_eyebrow', 'contact_title', 'contact_body']}
			/>

			<div
				class="panel-dark p-6 text-sm leading-7 text-stone-300"
				data-directus={getDirectusAttr({
					enabled: data.visualEditing,
					collection: 'site_settings',
					item: data.site.id,
					fields: ['address_lines', 'phone', 'email', 'location_note'],
					mode: 'drawer'
				})}
			>
				{#each data.site.addressLines as line (line)}
					<p>{line}</p>
				{/each}
				<p class="mt-4">
					<a class="hover:text-white" href={`tel:${data.site.phone.replace(/\s+/g, '')}`}
						>{data.site.phone}</a
					>
				</p>
				<p><a class="hover:text-white" href={`mailto:${data.site.email}`}>{data.site.email}</a></p>
				<p class="mt-4 text-stone-400">{data.site.locationNote}</p>
			</div>

			<div class="flex flex-wrap gap-4">
				<a class="btn-primary" href={data.site.reservationUrl}>Reserve a table</a>
				<a class="btn-secondary" href={data.site.mapsUrl}>Open directions</a>
				<a class="btn-secondary" href={data.site.whatsappUrl}>Message on WhatsApp</a>
			</div>
		</div>

		<div class="space-y-4">
			<div class="panel-dark p-6">
				<p class="section-kicker">Hours</p>
				<div class="mt-5 space-y-4">
					{#each data.hours as entry (entry.day)}
						<div
							class="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
							data-directus={getDirectusAttr({
								enabled: data.visualEditing,
								collection: 'business_hours',
								item: entry.id,
								fields: ['day', 'open', 'close', 'closed', 'note'],
								mode: 'popover'
							})}
						>
							<div>
								<p class="font-medium text-white">{entry.day}</p>
								{#if entry.note}
									<p class="mt-1 text-xs text-stone-500">{entry.note}</p>
								{/if}
							</div>
							<p class="text-sm text-stone-300">{formatServiceWindow(entry)}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="panel-dark overflow-hidden">
				<iframe
					title="Restaurant location"
					class="h-[20rem] w-full border-0"
					src="https://www.google.com/maps?q=214+Orchard+Street+New+York+NY&output=embed"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	</div>
</section>
