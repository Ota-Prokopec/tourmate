<script lang="ts">
	import ExperienceCardComponent from '$lib/components/Experience-monument/Cards/experience/ExperienceCardComponent.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { useQuery } from '@sveltestack/svelte-query';
	import ExperienceCardSkeleton from '$lib/components/Experience-monument/Cards/experience/ExperienceCardSkeleton.svelte';
	import NoContent from '$lib/components/Common/NoContent.svelte';
	import type { ExperienceCard } from '@app/ts-types';
	import Loading from '$lib/components/Common/Loading.svelte';
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import CreateYourFirstPictureButton from '$lib/components/Buttons/CreateYourFirstPictureButton.svelte';

	export let userId: string;
	export let cardsLimit: number;
	export let isMyAccount: boolean;
	let usersExperiences: ExperienceCard[] = [];
	let initialLoading = false;
	let loadMoreIsLoading = false;

	const loadMonuments = async () => {
		initialLoading = usersExperiences.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadMoreIsLoading = usersExperiences.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfExperiences({ userId: userId, limit: cardsLimit, offset: usersExperiences.length })
			.then(({ getListOfExperiences: experiences }) => {
				usersExperiences = [...usersExperiences, ...experiences];
			});
		initialLoading = false;
		loadMoreIsLoading = false;
	};

	loadMonuments();
</script>

{#if initialLoading}
	<ExperienceCardSkeleton />
	<ExperienceCardSkeleton />
	<ExperienceCardSkeleton />
{:else if usersExperiences.length}
	{#each usersExperiences as experience}
		<ExperienceCardComponent {experience} />
	{/each}
{:else}
	<NoContent class="w-full" />
	{#if isMyAccount}
		<CreateYourFirstPictureButton />
	{/if}
{/if}

{#if loadMoreIsLoading}
	<Loading />
{:else}
	<LoadMoreButton on:click={loadMonuments} />
{/if}
