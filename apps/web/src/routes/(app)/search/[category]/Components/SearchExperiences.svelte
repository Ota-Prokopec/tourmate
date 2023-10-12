<script lang="ts">
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import type { Experience, GraphqlDocument } from '@app/ts-types';

	export let experiences: GraphqlDocument<Experience>[] | undefined;
</script>

{#if experiences}
	{#each experiences as experience}
		<ExperienceCard class="h-40" {experience} />
	{/each}
{:else}
	There are no experiences
{/if}
