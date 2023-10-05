<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import type { GraphqlDocument, Monument, PlaceDetail, UserInfo } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let monument: GraphqlDocument<Monument> & { placeDetail: PlaceDetail; creator: UserInfo };

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;
</script>

<Card
	on:click={() => goto(`/monument/${monument._id}`)}
	class={twMerge(' justify-self-center gap-2', className)}
	padding="sm"
>
	<UserItem class="h-8" user={monument.creator} />

	<Img class="rounded-lg object-cover " src={imgSrcAsString} />

	<Row class="justify-between">
		<h5 class="mb-2 text-xl text-black">
			{monument.name}
		</h5>
		<Text class="text-right">
			<Row class="gap-1">
				<Icon icon="fas fa-map-marker-alt" class="text-xl " />
				{monument.placeDetail.name}
			</Row>
		</Text>
	</Row>
</Card>
