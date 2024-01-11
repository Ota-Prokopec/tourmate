<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Common/Card.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import type { Experience, ExperienceCard, GraphqlDocument } from '@app/ts-types';
	import { Button, Img, Modal } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { Queries, collections, user } from '$lib/appwrite/appwrite';
	import { sdk } from '$src/graphql/sdk';
	import { alert } from '$src/routes/alertStore';
	import Row from '$lib/components/Common/Row.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import OwnerOptions from '../OwnerOptions.svelte';
	import MonumentCard from '../monument/MonumentCardComponent.svelte';
	import LikeSection from '$lib/components/LikeSection/LikeSection.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { LikeSectionState } from '$lib/components/LikeSection/LikeSectionState';

	export let experience: ExperienceCard;

	export let dismissable = false;

	let liked: LikeSectionState | undefined =
		'liked' in experience ? (experience.liked ? 'liked' : 'unliked') : undefined;

	let isCardVisible = true;
	let amIOwner: boolean | 'pending' =
		$user === null ? 'pending' : experience.user.userId === $user.$id;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'like-pending';
		try {
			const { likeExperience: doc } = await sdk.likeExperience({ experienceId: experience._id });
			experience.liked = doc;
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
			if (liked === 'like-pending') return; // dont continue, because i dont know what state it will be, either liked or not => the state is pending so it is fetching at this time, i will know result in a while
			if (!$user?.$id) throw new Error('user is not authed');
			liked = 'unlike-pending';
			await collections.experienceLike.deleteDocument([
				Queries.experienceLike.equal('experienceId', experience._id),
				Queries.experienceLike.equal('userId', $user.$id)
			]);
			liked = 'unliked';
			experience.liked = null;
		} catch (error) {
			liked = 'liked';
			alert('', $LL.error.removeLikeError(), { color: 'red' });
		}
	};

	let showModalDeleteDocument = false;

	const deleteExperience = () => {
		showModalDeleteDocument = true;
	};
	const reallyDeleteExperience = async () => {
		try {
			await sdk.deleteExperience({ experienceId: experience._id });
			showModalDeleteDocument = false;
			isCardVisible = false;
		} catch (error) {
			alert('', $LL.error.universalErrorMessage());
		}
	};

	let className = '';
	export { className as class };

	//TODO: when experience does not have any monument => because monument was deleted => create a card or something that says the monument was deleted at this experience
</script>

<Modal color="red" bind:open={showModalDeleteDocument}>
	<Text>{$LL.component.ExperienceCardComponent.reallyDeleteYourExperienceQuestion()}</Text>
	<svelte:fragment slot="footer">
		<Button on:click={reallyDeleteExperience} color="red">{$LL.common.yes()}</Button>
		<Button on:click={() => (showModalDeleteDocument = false)} color="green"
			>{$LL.common.no()}</Button
		>
	</svelte:fragment>
</Modal>

{#if isCardVisible}
	<Card
		on:dismiss
		{dismissable}
		class={twMerge(
			'relative justify-self-center gap-0 h-auto w-auto shadow-none border-none p-2 border-0',
			className
		)}
	>
		<Column class="relative w-full gap-0">
			<Row class="w-full absolute justify-between p-2">
				<UserItem
					on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
					avatarClass="w-10 h-10"
					class="h-auto z-20"
					user={experience.user}
				/>

				{#if amIOwner}
					<OwnerOptions type="experience" on:delete={deleteExperience} />
				{/if}
			</Row>

			<CardImage on:like={like} imgSrc={experience.pictureUrl}>
				{#if typeof liked !== 'undefined' && typeof experience.totalLikesCount !== 'undefined'}
					<LikeSection
						class="absolute bottom-0 left-0 m-6"
						ableToLike={!amIOwner}
						on:like={like}
						on:unlike={unlike}
						data={{
							liked: liked,
							otherUsersThatLiked: experience.likes.map((l) => l.user),
							totalLikesCount: experience.totalLikesCount
						}}
					/>
				{/if}
			</CardImage>

			{#if experience.connectedMonument}
				<MonumentCard class="mt-[-10px]" size="tiny" monument={experience.connectedMonument} />
			{:else}
				<Text>
					{$LL.component.ExperienceCardComponent.monumentThatWasConnectedToTheExperienceWasDeleted()}
				</Text>
			{/if}
		</Column>
	</Card>
{/if}
