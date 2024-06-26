<script lang="ts">
	import { goto } from '$app/navigation';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import MoreInformationButton from '$lib/components/Buttons/MoreInformationButton.svelte';
	import SeeOnGoogleMapsButton from '$lib/components/Buttons/SeeOnGoogleMapsButton.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Left from '$lib/components/Common/Left.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import type { LikeSectionState } from '$lib/components/LikeSection/LikeSectionState';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { MonumentCard, SmallMonumentCard } from '@app/ts-types';
	import { getLocationUrlOfGoogleMaps, normalizeMeters } from '@app/utils';
	import { Button } from 'flowbite-svelte';
	import { distanceTo } from 'geolocation-utils';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';
	import OwnerOptions from '../OwnerOptions.svelte';
	import CardFooter from './MonumentCardFooter.svelte';
	import CardHeader from './MonumentCardHeader.svelte';

	const isMonumentCard = (card: MonumentCard | SmallMonumentCard): card is MonumentCard => {
		return 'liked' in monument;
	};
	const isTinyMonumentCard = (
		card: MonumentCard | SmallMonumentCard
	): card is SmallMonumentCard => {
		return !('liked' in monument);
	};

	let usersLocation = $lsStore.usersLocation;
	$: usersLocation = $lsStore.usersLocation;

	type TSize = $$Generic<'normal' | 'small' | 'tiny'>;
	export let size: TSize;

	export let monument: typeof size extends 'normal' ? MonumentCard : SmallMonumentCard;

	let isOwner: boolean | undefined =
		'user' in monument ? monument.user.userId === $user?.$id : undefined;

	export let isCardVisible = true;
	export let disableSeeMoreButton = false;
	export let disableSharing = false;
	export let disablePlaceLink = false;
	export let disableAccountLink = false;
	export let dismissable = false;
	export let disableOwnerOptions = false;
	let liked: LikeSectionState | undefined =
		'liked' in monument ? (monument.liked ? 'liked' : 'unliked') : undefined;

	//reactive distance
	export let distanceInMeters = usersLocation
		? distanceTo(
				{ lat: usersLocation[0], lng: usersLocation[1] },
				{ lat: monument.location[0], lng: monument.location[1] }
		  )
		: undefined;

	$: distanceInMeters = usersLocation
		? distanceTo(
				{ lat: usersLocation[0], lng: usersLocation[1] },
				{ lat: monument.location[0], lng: monument.location[1] }
		  )
		: undefined;

	let distanceInMetersNormalized =
		typeof distanceInMeters === 'number' ? normalizeMeters(distanceInMeters) : undefined;
	$: distanceInMetersNormalized =
		typeof distanceInMeters === 'number' ? normalizeMeters(distanceInMeters) : undefined;
	//reactive distance

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
			alert('', $LL.error.addLikeError(), {
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
			alert('', $LL.error.removeLikeError(), {
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
			alert('', $LL.error.deleteErrorMessage({ what: $LL.common.monument() }), { color: 'red' });
		}
	};

	const editMonument = async () => {
		goto(`/monument/${monument._id}/edit`);
	};

	const seeOnGoogleMaps = () => {
		navigate(getLocationUrlOfGoogleMaps(monument.location));
	};
</script>

<Alert color="red" class="z-50 fixed top-0" dismissable bind:visible={showModalDeleteDocument}>
	<Text slot="message">{$LL.component.MonumentCardComponent.reallyDeleteTheMonumentLabel()}</Text>
	<svelte:fragment slot="buttons">
		<Button on:click={reallyDeleteMonument} color="red">{$LL.common.yes()}</Button>
		<Button on:click={() => (showModalDeleteDocument = false)} color="green"
			>{$LL.common.no()}</Button
		>
	</svelte:fragment>
</Alert>

{#if isCardVisible}
	<Card on:click on:dismiss {dismissable} class={twMerge('gap-2 mobile:w-full ', className)}>
		<slot slot="dismissArea" name="dismissArea" />
		{#if size !== 'tiny'}
			<Row class="justify-between w-full">
				{#if isMonumentCard(monument)}
					<UserItem
						disableProfileLinkOnClick={disableAccountLink}
						avatarClass="w-10 h-10"
						class="h-auto"
						user={monument.user}
					/>
				{/if}

				<Column class="gap-0 flex justify-center items-center">
					{#if isOwner && !disableOwnerOptions}
						<OwnerOptions type="monument" on:edit={editMonument} on:delete={deleteMonument} />
					{/if}
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
			class="pb-2 pt-2 w-full"
			columns="1fr 1fr"
		>
			<CardImage
				disableFullScreen
				on:like={() => {
					if (liked === 'unliked') like();
				}}
				imgSrc={monument.pictureURL}
			/>
			{#if size === 'normal'}
				<Left class="pl-4"><Text>{distanceInMetersNormalized}</Text></Left>
			{/if}

			<CardHeader {disablePlaceLink} {monument} />
		</svelte:component>

		{#if size !== 'tiny'}
			{#if isMonumentCard(monument) && liked}
				<CardFooter {usersLocation} {liked} on:like={like} on:unlike={unlike} {monument} />
			{/if}
		{/if}

		<div class="w-full h-auto flex justify-start">
			<slot />
		</div>

		{#if size !== 'tiny'}
			<Column class="gap-2 ">
				<Right>
					<SeeOnGoogleMapsButton on:click={seeOnGoogleMaps} />
				</Right>
				{#if !disableSeeMoreButton}
					<MoreInformationButton on:click={() => goto(`/monument/${monument._id}`)} />
				{/if}
			</Column>
		{/if}
		<div class="w-full h-auto mt-2">
			<slot name="bottom" />
		</div>
	</Card>
{/if}
