<script lang="ts">
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import MonumentCard from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import type {
		ExperienceCard as ExperienceCardData,
		MonumentCard as MonumentCardData
	} from '@app/ts-types';

	export let experiences: ExperienceCardData[] | undefined;
	export let monuments: MonumentCardData[] | undefined;
</script>

{#if monuments}
	{#each monuments as monument}
		<MonumentCard {monument} />
	{/each}
{/if}

{#if experiences}
	{#each experiences as experience}
		<ExperienceCard {experience} />
	{/each}
{/if}
