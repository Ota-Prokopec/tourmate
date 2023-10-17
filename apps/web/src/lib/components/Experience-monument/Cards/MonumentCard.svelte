<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import { Query, collections, user } from '@app/appwrite-client';
	import permissions from '@app/appwrite-server/src/permissions';
	import { transformAppwriteToGraphql } from '@app/appwrite-ssr-graphql/src/databases/transformAppwriteToGraphql';
	import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-ssr-graphql/src/databases/transformer';
	import type { MonumentCard, MonumentLikeDocument } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import TopicItem from '../topic/TopicItem.svelte';
	import IconOptions from '$lib/components/Icons/IconOptions.svelte';
	import MonumentOwnerOptions from '../Monument/MonumentOwnerOptions.svelte';

	export let monument: MonumentCard;
	let amIOwner = monument.creator.userId === $user?.$id;

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		const doc = await collections.monumentLike.createDocument(
			{ monumentId: monument._id, userId: $user.$id },
			permissions.owner($user.$id)
		);
		monument.liked = transformAppwriteDocumentsIntoGraphqlDocuments(doc)[0];
	};
	const unlike = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		await collections.monumentLike.deleteDocument([
			Query.equal('monumentId', monument._id),
			Query.equal('userId', $user.$id)
		]);
		monument.liked = null;
	};
</script>

<Card class={twMerge('relative justify-self-center gap-2', className)} padding="sm">
	<Row class="justify-between">
		<UserItem
			on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
			avatarClass="w-10 h-10"
			class="h-auto"
			user={monument.creator}
		/>
		<MonumentOwnerOptions />
	</Row>

	<button on:click={() => goto(`/monument/${monument._id}`)}>
		<Img class="rounded-lg object-cover " src={imgSrcAsString} />
	</button>

	<Row class="w-full justify-between">
		<LikeSection
			ableToLike={!amIOwner}
			on:like={like}
			on:unlike={unlike}
			data={{
				liked: monument.liked ? true : false,
				otherUsersThatLiked: monument.likes.map((l) => l.user)
			}}
		/>
		{#if monument.topic}
			<TopicItem class="mr-4" topicKey={monument.topic} />
		{/if}
	</Row>

	<Row class="justify-between">
		<h5 class="mb-2 text-xl text-black">
			{monument.name}
		</h5>
		<Text class="text-right">
			<button on:click={() => goto(`/search/places/${monument.placeDetail.name}`)}>
				<Row class="gap-1">
					<Icon icon="fas fa-map-marker-alt" class="text-xl " />
					{monument.placeDetail.name}
				</Row>
			</button>
		</Text>
	</Row>
</Card>
