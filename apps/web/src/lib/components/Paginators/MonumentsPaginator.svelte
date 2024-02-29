<script lang="ts">
	import CreateYourFirstMonumentButton from '$lib/components/Buttons/CreateYourFirstMonumentButton.svelte';
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import { disableExperimentalFragmentVariables } from '@apollo/client';
	import type { MonumentCard } from '@app/ts-types';

	export let userId: string | undefined = undefined;
	export let cardsLimit: number;
	export let distableCreateNewButton = false;
	let monuments: MonumentCard[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadMonuments = async () => {
		initialLoading = monuments.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = monuments.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfMonumentCards({ userId: userId, limit: cardsLimit, offset: monuments.length })
			.then(({ getListOfMonuments: newMonuments }) => {
				monuments = [...monuments, ...newMonuments];
			});
		initialLoading = false;
		loadingMoreItems = false;
	};

	loadMonuments();
</script>

<Paginating
	wrapperClassName="mobile:w-full"
	{loadingMoreItems}
	let:item
	{initialLoading}
	list={monuments}
	on:loadMore={loadMonuments}
>
	<svelte:fragment slot="loading">
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
	</svelte:fragment>

	<MonumentCardComponent size="normal" monument={item} />

	<svelte:fragment slot="noContent">
		{#if !distableCreateNewButton}
			<CreateYourFirstMonumentButton />
		{/if}
	</svelte:fragment>
</Paginating>
