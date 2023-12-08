<script lang="ts">
	import type { LikeSectionState } from '$lib/components/LikeSection/LikeSectionState';
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
	import UserItem from '$lib/components/User/UserItem.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard, SmallMonumentCard } from '@app/ts-types';
	import { getLocationUrlOfGoogleMaps, normalizeMeters } from '@app/utils';
	import { Button, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';
	import CardFooter from './MonumentCardFooter.svelte';
	import CardHeader from './MonumentCardHeader.svelte';
	import IconCheck from '$lib/components/Icons/IconCheck.svelte';

	const isMonumentCard = (card: MonumentCard | SmallMonumentCard): card is MonumentCard => {
		return 'liked' in monument;
	};
	const isTinyMonumentCard = (
		card: MonumentCard | SmallMonumentCard
	): card is SmallMonumentCard => {
		return !('liked' in monument);
	};

	const usersLocation = $lsStore.usersLocation;

	type T = $$Generic<'normal' | 'small' | 'tiny'>;

	export let size: T;

	export let monument: typeof size extends 'normal' ? MonumentCard : SmallMonumentCard;

	let amIOwner: boolean | undefined =
		'user' in monument ? monument.user.userId === $user?.$id : undefined;

	export let isCardVisible = true;
	export let disableSeeMoreButton = false;
	export let disableSharing = false;
	export let dismissable = false;
	let liked: LikeSectionState | undefined =
		'liked' in monument ? (monument.liked ? 'liked' : 'unliked') : undefined;

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
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'like-pending';
		try {
			const { likeMonument: doc } = await sdk.likeMonument({ monumentId: monument._id });
			monument.liked = doc;
			liked = 'liked';
		} catch (error) {
			liked = 'unliked';
			alert($LL.likeErrorTitle(), $LL.likeErrorMessage(), {
				color: 'red'
			});
			throw new Error('like monument error happend');
		}
	};
	const unlike = async () => {
		try {
			if (!isMonumentCard(monument)) throw new Error('monument is not type of monument card');

			if (!$user?.$id) throw new Error('user is not authed');
			liked = 'unlike-pending';
			await collections.monumentLike.deleteDocument([
				Queries.monumentLike.equal('monumentId', monument._id),
				Queries.monumentLike.equal('userId', $user.$id)
			]);
			liked = 'unliked';
			monument.liked = null;
		} catch (error) {
			alert($LL.removeLikeErrorTitle(), $LL.removeLikeErrorMessage(), {
				color: 'red'
			});
			liked = 'liked';
		}
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
		class={twMerge('relative justify-self-center gap-2 p-2 min-w-[350px] mobile:w-full', className)}
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
						<Icon class="mb-2" on:click={() => goto(`/monument/${monument._id}/share`)}>
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
				{#if isMonumentCard(monument)}
					{#if monument.usersConnectedExperiences.length}
						<Row class="w-full h-auto justify-end p-2 gap-2">
							<Text>{$LL.pictureAlreadyTaken()}</Text>
							<Icon class="child:fill-green-500 child:w-4 child:h-4">
								<IconCheck />
							</Icon>
						</Row>
					{/if}
				{/if}
			</Column>
		{/if}
		<div class="w-full h-auto mt-2">
			<slot name="bottom" />
		</div>
	</Card>
{/if}
