<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import { P, Button } from 'flowbite-svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { myNewExperienceStore } from '../../newExperienceStore';
	import { sdk } from '$src/graphql/sdk';

	export let data: PageData;
	let isLoading = false;
	const img = $myNewExperienceStore.imgSrc;

	const save = () => {
		sdk.createExperience({
			input: {
				location: [0, 0],
				picture: '',
				placeName: 'horni záhoří'
			}
		});
	};
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50">
		<Icon icon="fas fa-map-marker-alt" class="text-3xl" />
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{data.newExperience.placeName}
		</h5>
		<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
			lokace: [{data.newExperience.location}]
		</p>

		<Button
			class="mb-24 mt-4 flex flex-wrap flex-row gap-2 w-min self-end h-min"
			color="blue"
			on:click={save}
		>
			{#if isLoading}
				<Loading />
			{:else}
				<span>Vytvořit</span>
			{/if}
		</Button>
	</Card>

	<Map location={data.newExperience.location} class="h-[100dvh] fixed top-0" />
</div>
