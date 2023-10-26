<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import type { MonumentCard } from '@app/ts-types';
	import { Button, Img, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import MonumentOwnerOptions from '../Monument/MonumentOwnerOptions.svelte';
	import { sdk } from '$src/graphql/sdk';
	import TopicItem from '../topic/TopicItem.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import Card from '$lib/components/Common/Card.svelte';

	export let monument: MonumentCard;
	let amIOwner = monument.creator.userId === $user?.$id;
	export let isCardVisible = true;
	export let disableSeeMoreButton = false;
	export let disableSharing = false;

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		monument.liked = true;
		try {
			const { likeMonument: doc } = await sdk.likeMonument({ monumentId: monument._id });
			monument.liked = doc;
		} catch (error) {
			throw new Error('like monument error happend');
		}
	};
	const unlike = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		monument.liked = false;
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

	const editMonument = async () => {
		goto(`/monument/edit/${monument._id}`);
	};
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
	<Card class={twMerge('relative justify-self-center gap-2', className)}>
		<Row class="justify-between">
			<UserItem
				on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
				avatarClass="w-10 h-10"
				class="h-auto"
				user={monument.creator}
			/>
			<Column class="gap-0 flex justify-center items-center">
				<MonumentOwnerOptions on:edit={editMonument} on:delete={deleteMonument} />
				{#if !disableSharing}
					<Icon on:click={() => goto(`/monument/${monument._id}/share`)}>
						<IconShare class="w-5 h-5" />
					</Icon>
				{/if}
			</Column>
		</Row>

		<button
			on:dblclick={() => {
				if (!monument.liked) like();
			}}
		>
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
			{#if monument.topics}
				<Row class="gap-2">
					{#each monument.topics as topic}
						<TopicItem topicKey={topic} />
					{/each}
				</Row>
			{/if}
		</Row>

		<Row class="justify-between gap-2">
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
		{#if !disableSeeMoreButton}
			<Button on:click={() => goto(`/monument/${monument._id}`)} color="blue">see more....</Button>
		{/if}
	</Card>
{/if}
