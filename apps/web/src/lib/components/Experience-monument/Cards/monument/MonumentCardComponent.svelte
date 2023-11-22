<script lang="ts">
	import OwnerOptions from '../OwnerOptions.svelte';
	import { distanceTo } from 'geolocation-utils';
	import LL from '$src/i18n/i18n-svelte';
	import { navigate } from '$lib/utils/navigator';
	import { goto } from '$app/navigation';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Left from '$lib/components/Common/Left.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard } from '@app/ts-types';
	import { getLocationUrlOfGoogleMaps, normalizeMeters } from '@app/utils';
	import { Button, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';
	import CardFooter from './CardFooter.svelte';
	import CardHeader from './CardHeader.svelte';

	const isMonumentCard = (card: MonumentCard | TinyMonumentCard): card is MonumentCard => {
		return 'liked' in monument;
	};
	const isTinyMonumentCard = (card: MonumentCard | TinyMonumentCard): card is TinyMonumentCard => {
		return !('liked' in monument);
	};

	const usersLocation = $lsStore.usersLocation;

	type TinyMonumentCard = Omit<MonumentCard, 'user' | 'likes' | 'liked' | 'question'>;

	type T = $$Generic<'normal' | 'small' | 'tiny'>;

	export let size: T;

	export let monument: typeof size extends 'normal' ? MonumentCard : TinyMonumentCard;

	let amIOwner: boolean | undefined =
		'user' in monument ? monument.user.userId === $user?.$id : undefined;

	export let isCardVisible = true;
	export let disableSeeMoreButton = false;
	export let disableSharing = false;
	export let dismissable = false;
	let liked: boolean | 'pending' | undefined =
		'liked' in monument ? (monument.liked ? true : false) : undefined;

	export let distanceInMeters = usersLocation
		? distanceTo(
				{ lat: usersLocation[0], lng: usersLocation[1] },
				{ lat: monument.location[0], lng: monument.location[1] }
		  )
		: undefined;

	const distanceInMetersNormalized =
		typeof distanceInMeters === 'number' ? normalizeMeters(distanceInMeters) : undefined;

	let className = '';
	export { className as class };

	const like = async () => {
		if (!isMonumentCard(monument)) throw new Error('monument is not type of monument card');
		if (!'liked') if (!$user?.$id) throw new Error('user is not authed');
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
		if (!isMonumentCard(monument)) throw new Error('monument is not type of monument card');
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
		try {
			await sdk.deleteMonument({ monumentId: monument._id });
			showModalDeleteDocument = false;
			isCardVisible = false;
		} catch (error) {
			alert(
				$LL.deleteErrorTitle({ what: $LL.monument() }),
				$LL.deleteErrorMessage({ what: $LL.monument() }),
				{ color: 'red' }
			);
		}
	};

	const editMonument = async () => {
		goto(`/monument/${monument._id}/edit`);
	};

	const seeOnGoogleMaps = () => {
		navigate(getLocationUrlOfGoogleMaps(monument.location));
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
	<Card
		on:dismiss
		{dismissable}
		class={twMerge('relative justify-self-center gap-2 p-2', className)}
	>
		{#if size !== 'tiny'}
			<Row class="justify-between">
				{#if isMonumentCard(monument)}
					<UserItem
						on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
						avatarClass="w-10 h-10"
						class="h-auto"
						user={monument.user}
					/>
				{/if}

				<Column class="gap-0 flex justify-center items-center">
					<OwnerOptions type="monument" on:edit={editMonument} on:delete={deleteMonument} />
					{#if !disableSharing}
						<Icon on:click={() => goto(`/monument/${monument._id}/share`)}>
							<IconShare class="w-5 h-5" />
						</Icon>
					{/if}
				</Column>
			</Row>
		{/if}

		<svelte:component
			this={size === 'tiny' || size === 'small' ? Columns : Column}
			columns="1fr 1fr"
		>
			<CardImage on:like={like} imgSrc={monument.pictureURL} />
			{#if size !== 'tiny'}
				<Left class="pl-4"><Text>{distanceInMetersNormalized}</Text></Left>
			{/if}

			<CardHeader {monument} />
		</svelte:component>

		{#if size !== 'tiny'}
			{#if isMonumentCard(monument) && typeof liked !== 'undefined' && typeof amIOwner !== 'undefined'}
				<CardFooter
					{usersLocation}
					{liked}
					on:like={like}
					on:unlike={unlike}
					{amIOwner}
					{monument}
				/>
			{/if}
		{/if}

		<div class="w-full h-auto flex justify-start">
			<slot />
		</div>

		{#if size !== 'tiny'}
			<Column class="gap-2 mt-2">
				<Right>
					<Button on:click={seeOnGoogleMaps} color="green">{$LL.seeOnGoogleMaps()}</Button>
				</Right>
				{#if !disableSeeMoreButton}
					<Button
						color="blue"
						class=" w-full p-2"
						on:click={() => goto(`/monument/${monument._id}`)}>{$LL.seeMore()}</Button
					>
				{/if}
			</Column>
		{/if}
		<div class="w-full h-auto mt-2">
			<slot name="bottom" />
		</div>
	</Card>
{/if}
