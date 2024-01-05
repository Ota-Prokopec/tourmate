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
	import Paginating from '$lib/components/Common/Paginating.svelte';

	export let userId: string;
	export let cardsLimit: number;
	export let isMyAccount: boolean;
	let usersExperiences: ExperienceCard[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadMonuments = async () => {
		initialLoading = usersExperiences.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = usersExperiences.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfExperiences({ userId: userId, limit: cardsLimit, offset: usersExperiences.length })
			.then(({ getListOfExperiences: experiences }) => {
				usersExperiences = [...usersExperiences, ...experiences];
			});
		initialLoading = false;
		loadingMoreItems = false;
	};

	loadMonuments();
</script>

<Paginating
	{loadingMoreItems}
	let:item
	{initialLoading}
	list={usersExperiences}
	on:loadMore={loadMonuments}
>
	<svelte:fragment slot="loading">
		<ExperienceCardSkeleton />
		<ExperienceCardSkeleton />
		<ExperienceCardSkeleton />
	</svelte:fragment>

	<ExperienceCardComponent experience={item} />

	<svelte:fragment slot="noContent">
		{#if isMyAccount}
			<CreateYourFirstPictureButton />
		{/if}
	</svelte:fragment>
</Paginating>
