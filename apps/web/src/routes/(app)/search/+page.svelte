<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import ExperienceCard from '$lib/components/Experience/Cards/ExperienceCard.svelte';
	import MonumentCard from '$lib/components/Experience/Cards/MonumentCard.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';

	$: experiencesGrapqhl = useQuery(
		'experiences',
		async () => await sdk.getListOfExperiencesWithCreator()
	);
	$: monumentsGraphql = useQuery(
		'mutations',
		async () => await sdk.getListOfMonumentsWithCreator()
	);

	$: monuments = $monumentsGraphql.data?.getListOfMonuments;
	$: experiences = $experiencesGrapqhl.data?.getListOfExperiences;

	const categories = [
		{
			title: 'fotky',
			key: 'experiences'
		},
		{
			title: 'zážitky',
			key: 'monuments'
		}
	];

	let chosenCategory: 'monuments' | 'experiences' = 'experiences';

	const search = async () => {};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	<Input class="max-w-full w-[400px]" icon iconPosition="right" on:iconClick={search}>
		<IconMagnifyingGlass />
	</Input>
	<CategoryPicker bind:chosenCategory {categories} />

	<div class="w-full h-auto flex flex-wrap flex-row gap-2 justify-start items-start">
		{#if chosenCategory === 'experiences'}
			{#if experiences}
				{#each experiences as experience}
					<ExperienceCard class="h-40" {experience} />
				{/each}
			{/if}
		{:else if monuments}
			{#each monuments as monument}
				<MonumentCard {monument} />
			{/each}
		{/if}
	</div>
</div>
