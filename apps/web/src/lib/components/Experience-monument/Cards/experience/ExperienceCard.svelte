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
	import Columns from '$lib/components/Common/Columns.svelte';
	import CardHeader from './CardHeader.svelte';

	export let experience: ExperienceCard;
	export let disableReRouting = false;
	export let dismissable = false;
	let liked: boolean | 'pending' = experience.liked ? true : false;
	let isCardVisible = true;
	export let minimalized = false;
	let amIOwner = experience.user.userId === $user?.$id;
	export let disableSeeMoreButton = false;

	const onClick = () => {
		if (disableReRouting) return;
		goto(`/experience/${experience._id}`);
	};

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
			'relative justify-self-center gap-0 h-min ',
			minimalized && 'border-0',
			className
		)}
	>
		<Column>
			<CardImage on:like={like} imgSrc={experience.imgSrc} />

			<CardHeader
				class={twMerge(minimalized && 'absolute bottom-0 m-2')}
				{liked}
				on:like={like}
				on:unlike={unlike}
				{amIOwner}
				{experience}
			/>

			<UserItem
				on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
				avatarClass="w-10 h-10"
				class={twMerge('h-auto', minimalized && 'absolute m-1')}
				user={experience.user}
			/>

			{#if !minimalized}
				<ExperienceOwnerOptions on:delete={deleteExperience} />
			{/if}
		</Column>

		<div class="w-full h-auto flex justify-start">
			<slot />
		</div>

		{#if !disableSeeMoreButton}
			<Button
				color="blue"
				class=" w-full p-2"
				on:click={() => goto(`/experience/${experience._id}`)}>see more about experience</Button
			>
		{/if}
	</Card>
{/if}
