<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import permissions from '@app/appwrite-server/src/permissions';
	import type { MonumentCard, MonumentLikeDocument } from '@app/ts-types';
	import { Button, Card, Img, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import TopicItem from '../topic/TopicItem.svelte';
	import MonumentOwnerOptions from '../Monument/MonumentOwnerOptions.svelte';
	import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-ssr-graphql';
	import { sdk } from '$src/graphql/sdk';

	export let monument: MonumentCard;
	let amIOwner = monument.creator.userId === $user?.$id;
	export let isCardVisible = true;

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		const { likeMonument: doc } = await sdk.likeMonument({ monumentId: monument._id });
		monument.liked = doc;
	};
	const unlike = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		await collections.monumentLike.deleteDocument([
			Queries.monumentLike.equal('monumentId', monument._id),
			Queries.monumentLike.equal('userId', $user.$id)
		]);
		monument.liked = null;
	};

	let showModalDeleteDocument = false;

	const deleteMonument = () => {
		showModalDeleteDocument = true;
	};
	const reallyDeleteMonument = async () => {
		await sdk.deleteMonument({ monumentId: monument._id });
		showModalDeleteDocument = false;
		isCardVisible = false;
	};

	const editMonument = async () => {};
</script>

<Modal color="red" bind:open={showModalDeleteDocument}>
	<Text>Do you really want to delete your monument, there is no way to get it back.</Text>
	<svelte:fragment slot="footer">
		<Button on:click={reallyDeleteMonument} color="red">Yes really</Button>
		<Button on:click={() => (showModalDeleteDocument = false)} color="green"
			>No i missed clicked</Button
		>
	</svelte:fragment>
</Modal>

{#if isCardVisible}
	<Card class={twMerge('relative justify-self-center gap-2', className)} padding="sm">
		<Row class="justify-between">
			<UserItem
				on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
				avatarClass="w-10 h-10"
				class="h-auto"
				user={monument.creator}
			/>
			<MonumentOwnerOptions on:edit={editMonument} on:delete={deleteMonument} />
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
{/if}
