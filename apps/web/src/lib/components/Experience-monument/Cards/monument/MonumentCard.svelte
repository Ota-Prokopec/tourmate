<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import type { MonumentCard } from '@app/ts-types';
	import { Button, Img, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import MonumentOwnerOptions from '../../Monument/MonumentOwnerOptions.svelte';
	import { sdk } from '$src/graphql/sdk';
	import Column from '$lib/components/Common/Column.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import CardImage from '../CardImage.svelte';
	import CardHeader from './CardHeader.svelte';
	import CardFooter from './CardFooter.svelte';
	import { alert } from '$src/routes/alertStore';

	export let monument: MonumentCard;
	let amIOwner = monument.user.userId === $user?.$id;
	export let isCardVisible = true;
	export let disableSeeMoreButton = false;
	export let disableSharing = false;
	export let dismissable = false;
	export let minimalized = false;
	let liked: boolean | 'pending' = monument.liked ? true : false;

	let className = '';
	export { className as class };

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'pending';
		try {
			const { likeMonument: doc } = await sdk.likeMonument({ monumentId: monument._id });
			monument.liked = doc;
			liked = true;
		} catch (error) {
			liked = false;
			alert('Error monument like', 'Your like was not recorded, please try it again.', {
				color: 'red'
			});
			throw new Error('like monument error happend');
		}
	};
	const unlike = async () => {
		if (liked === 'pending') return; // dont continue, because i dont know what state it will be, either liked or not => the state is pending so it is fetching at this time, i will know result in a while
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'pending';
		await collections.monumentLike.deleteDocument([
			Queries.monumentLike.equal('monumentId', monument._id),
			Queries.monumentLike.equal('userId', $user.$id)
		]);
		liked = false;
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
	<Card on:dismiss {dismissable} class={twMerge('relative justify-self-center gap-2', className)}>
		<Row class="justify-between">
			<UserItem
				on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
				avatarClass="w-10 h-10"
				class="h-auto"
				user={monument.user}
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

		<svelte:component this={minimalized ? Columns : Row} columns="1fr 1fr">
			<CardImage on:like={like} imgSrc={monument.pictureURL} />

			<Column>
				<CardHeader {liked} on:like={like} on:unlike={unlike} {amIOwner} {monument} />
				<CardFooter {monument} />
			</Column>
		</svelte:component>

		<div class="w-full h-auto flex justify-start">
			<slot />
		</div>

		{#if !disableSeeMoreButton}
			<Button color="blue" class="m-2 w-full p-2" on:click={() => goto(`/monument/${monument._id}`)}
				>see more....</Button
			>
		{/if}
	</Card>
{/if}
