<script lang="ts">
	import NoContent from '$lib/components/Common/NoContent.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCard } from '@app/ts-types';
	import LoadMoreButton from '$lib/components/Buttons/LoadMoreButton.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import CreateYourFirstMonumentButton from '$lib/components/Buttons/CreateYourFirstMonumentButton.svelte';

	export let userId: string;
	export let cardsLimit: number;
	export let isMyAccount: boolean;
	let usersMonuments: MonumentCard[] = [];
	let initialLoading = false;
	let loadMoreIsLoading = false;

	const loadMonuments = async () => {
		initialLoading = usersMonuments.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadMoreIsLoading = usersMonuments.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfMonumentCards({ userId: userId, limit: cardsLimit, offset: usersMonuments.length })
			.then(({ getListOfMonuments: monuments }) => {
				usersMonuments = [...usersMonuments, ...monuments];
			});
		initialLoading = false;
		loadMoreIsLoading = false;
	};

	loadMonuments();
</script>

{#if initialLoading}
	<MonumentCardSkeleton size="normal" />
	<MonumentCardSkeleton size="normal" />
	<MonumentCardSkeleton size="normal" />
{:else if usersMonuments.length}
	{#each usersMonuments as monument}
		<MonumentCardComponent size="normal" {monument} />
	{/each}
	{#if loadMoreIsLoading}
		<Loading />
	{:else}
		<LoadMoreButton on:click={loadMonuments} />
	{/if}
{:else}
	<NoContent class="w-full" />
	{#if isMyAccount}
		<CreateYourFirstMonumentButton />
	{/if}
{/if}
