<script lang="ts">
	import CreateYourFirstMonumentButton from '$lib/components/Buttons/CreateYourFirstMonumentButton.svelte';
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCard } from '@app/ts-types';

	export let userId: string;
	export let cardsLimit: number;
	export let isMyAccount: boolean;
	let usersMonuments: MonumentCard[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadMonuments = async () => {
		initialLoading = usersMonuments.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = usersMonuments.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfMonumentCards({ userId: userId, limit: cardsLimit, offset: usersMonuments.length })
			.then(({ getListOfMonuments: monuments }) => {
				usersMonuments = [...usersMonuments, ...monuments];
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
	list={usersMonuments}
	on:loadMore={loadMonuments}
>
	<svelte:fragment slot="loading">
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
		<MonumentCardSkeleton size="normal" />
	</svelte:fragment>

	<MonumentCardComponent size="normal" monument={item} />

	<svelte:fragment slot="noContent">
		{#if isMyAccount}
			<CreateYourFirstMonumentButton />
		{/if}
	</svelte:fragment>
</Paginating>
