<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Common/Card.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
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
	import ExperienceOwnerOptions from '../../Experience/ExperienceOwnerOptions.svelte';
	import MonumentCard from '../monument/MonumentCardComponent.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';

	export let experience: ExperienceCard;

	export let dismissable = false;
	let liked: boolean | 'pending' = experience.liked ? true : false;
	let isCardVisible = true;
	let amIOwner = experience.user.userId === $user?.$id;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'pending';
		try {
			const { likeExperience: doc } = await sdk.likeExperience({ experienceId: experience._id });
			experience.liked = doc;
			liked = true;
		} catch (error) {
			liked = false;
			alert('Error experience like', 'Your like was not recorded, please try it again.', {
				color: 'red'
			});
			throw new Error('like monument error happend');
		}
	};
	const unlike = async () => {
		if (liked === 'pending') return; // dont continue, because i dont know what state it will be, either liked or not => the state is pending so it is fetching at this time, i will know result in a while
		if (!$user?.$id) throw new Error('user is not authed');
		liked = 'pending';
		await collections.experienceLike.deleteDocument([
			Queries.experienceLike.equal('experienceId', experience._id),
			Queries.experienceLike.equal('userId', $user.$id)
		]);
		liked = false;
		experience.liked = null;
	};

	let showModalDeleteDocument = false;

	const deleteExperience = () => {
		showModalDeleteDocument = true;
	};
	const reallyDeleteMonument = async () => {
		await sdk.deleteExperience({ experienceId: experience._id });
		showModalDeleteDocument = false;
		isCardVisible = false;
	};

	let className = '';
	export { className as class };
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
					class={twMerge('h-auto')}
					user={experience.user}
				/>

				{#if amIOwner}
					<ExperienceOwnerOptions on:delete={deleteExperience} />
				{/if}
			</Row>

			<CardImage on:like={like} imgSrc={experience.pictureUrl}>
				<LikeSection
					class="absolute bottom-0 left-0 m-6"
					ableToLike={!amIOwner}
					on:like={like}
					on:unlike={unlike}
					data={{
						liked: experience.liked ? true : false,
						otherUsersThatLiked: experience.likes.map((l) => l.user)
					}}
				/>
			</CardImage>

			<MonumentCard class="mt-[-10px]" size="tiny" monument={experience.connectedMonument} />
		</Column>
	</Card>
{/if}
