<script lang="ts">
	import type { UserInfo } from '@app/ts-types';
	import IconHeart from '../Icons/IconHeart.svelte';
	import IconHeartOutline from '../Icons/IconHeartOutline.svelte';
	import Icon from './Icon.svelte';
	import Row from './Row.svelte';
	import Column from './Column.svelte';
	import Avatar from './Avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let data: {
		liked: boolean;
		otherUsersThatLiked: UserInfo[];
	};

	const heartClick = () => {
		if (data.liked) dispatch('unlike');
		else dispatch('like');
	};
</script>

<Row class="">
	<Icon on:click={heartClick}>
		{#if data.liked}
			<Icon class="fill-red-500">
				<IconHeart class="w-8 h-8" />
			</Icon>
		{:else}
			<Icon class="fill-black"><IconHeartOutline class="w-8 h-8" /></Icon>
		{/if}
	</Icon>
	<Row class="ml-6">
		{#each data.otherUsersThatLiked as user}
			<Avatar stacked size="sm" src={user.profilePictureURL}>
				{#if user.profilePictureURL}
					{user.username.at(0)}
				{/if}
			</Avatar>
		{/each}
	</Row>
</Row>
