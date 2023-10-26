<script lang="ts">
	import type { Base64, UserInfo, UserInfoDocument } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Common/Icon.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import Avatar from '../Common/Avatar.svelte';
	const dispatch = createEventDispatcher<{ close: undefined }>();

	export let imgSrc: string | Base64 | undefined = undefined;
	export let userInfo: UserInfo;
	export let disableCloseButton = false;

	let className = '';
	export { className as class };
</script>

<Card
	shadow
	padding="md"
	class={twMerge('grid grid-rows-[auto_auto] justify-center max-h-[95dvh] ', className)}
>
	<div class="w-full h-auto justify-end mt-2 grid grid-cols-[1fr_min-content]">
		<button
			on:click={() => goto(`/account/${userInfo.myId}`)}
			class="w-auto flex flex-wrap flex-col"
		>
			<Avatar size="lg" src={userInfo.profilePictureURL} />
			<span>{userInfo.username}</span>
			<span>{userInfo.myId}</span>
		</button>
		{#if !disableCloseButton}
			<Icon on:click={() => dispatch('close')}>
				<IconTimes class="w-10 h-10" />
			</Icon>
		{/if}
	</div>

	{#if imgSrc}
		<Card class="max-w-[75%] justify-self-center">
			<Img class="rounded-lg object-cover " src={imgSrc} />
		</Card>
	{/if}
</Card>
