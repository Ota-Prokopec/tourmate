<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import IconHeart from '../Icons/IconHeart.svelte';
	import IconHeartOutline from '../Icons/IconHeartOutline.svelte';
	import Icon from '../Common/Icon.svelte';
	import Row from '../Common/Row.svelte';
	import Avatar from '../Common/Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { LikeSectionState } from './LikeSectionState';
	import Text from '../Common/Text.svelte';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let data: {
		totalLikesCount: number;
		liked: LikeSectionState;
		otherUsersThatLiked: UserInfo[];
	};

	export let ableToLike = true;

	const heartClick = () => {
		if (data.liked === 'liked') dispatch('unlike');
		else if (data.liked === 'unliked') dispatch('like');
		else
			throw new Error(
				'Wait till your previous decision about liking this monument will be recorded'
			);
	};
	const stacked = data.otherUsersThatLiked.length > 1;

	let className = '';
	export { className as class };
</script>

<Row class={twMerge('gap-1', className)}>
	<Icon on:click={heartClick}>
		{#if ableToLike}
			{#if data.liked === 'liked' || data.liked === 'like-pending'}
				<Icon class="!fill-red-500">
					<IconHeart class="w-8 h-8" />
				</Icon>
			{:else}
				<Icon class="fill-black dark:fill-white"><IconHeartOutline class="w-8 h-8" /></Icon>
			{/if}
		{/if}
	</Icon>
	<Row class="">
		{#if data.otherUsersThatLiked.length}
			{#each data.otherUsersThatLiked as user, index}
				<Avatar
					isAvatarFirstInStack={index === 0}
					{stacked}
					size="sm"
					src={user.profilePictureURL}
				/>
			{/each}
			{#if data.totalLikesCount - data.otherUsersThatLiked.length > 0}
				<Text>+{data.totalLikesCount - data.otherUsersThatLiked.length}</Text>
			{/if}
		{/if}
	</Row>
</Row>
