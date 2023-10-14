<script lang="ts">
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { Experience, GraphqlDocument } from '@app/ts-types';
	import { useQuery } from '@sveltestack/svelte-query';

	export let experiences: GraphqlDocument<Experience>[] | undefined;

	$: experiencesGrapqhl = useQuery('experiences', async () => await sdk.getListOfExperienceCards());
	let isLoading = $experiencesGrapqhl.isLoading;

	$: experiences = $experiencesGrapqhl.data?.getListOfExperiences;
</script>

{#if experiences}
	{#each experiences as experience}
		<ExperienceCard class="h-40" {experience} />
	{/each}
{:else}
	There are no experiences
{/if}
