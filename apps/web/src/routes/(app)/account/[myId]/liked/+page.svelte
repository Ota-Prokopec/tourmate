<script lang="ts">
	import Paginating from '$lib/components/Common/Paginating.svelte';
	import { sdk } from '$src/graphql/sdk';
	import type { MonumentCard } from '@app/ts-types';
	import type { PageData } from './$types';
	import MonumentCardSkeleton from '$lib/components/Experience-monument/Cards/monument/MonumentCardSkeleton.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconHeart from '$lib/components/Icons/IconHeart.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';

	export let data: PageData;

	let monuments: MonumentCard[] = [];
	let initialLoading = false;
	let loadingMoreItems = false;

	const loadMonuments = async () => {
		initialLoading = monuments.length === 0 ? true : false; // true only if there are no monuments in the usersMonuments
		loadingMoreItems = monuments.length > 0 ? true : false; //true only when there already is some monument in the usersMonuments

		await sdk
			.getListOfLikedMonumentCards({
				limit: data.cardsLimit,
				offset: monuments.length,
				userId: data.usersProfile.userId
			})
			.then(({ getListOfMonumentLikeDocuments: data }) => {
				monuments = [...monuments, ...data.map((item) => item.monument)];
			});
		initialLoading = false;
		loadingMoreItems = false;
	};

	loadMonuments();
</script>

<Column class="  mt-4">
	<Row class="gap-4">
		<UserItem user={data.usersProfile} />
		<Icon class="child:w-10 child:h-10 child:fill-red-500 ">
			<IconHeart />
		</Icon>
	</Row>

	<Paginating
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
	</Paginating>
</Column>
