<script lang="ts" context="module">
	import IconHome from '$lib/components/Icons/IconHome.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { MessagePayload } from 'firebase/messaging';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');

	import lsSvelte from '$lib/utils/lsStore';
	import { watchUsersLocation } from '@app/utils';
	import { browser } from '$app/environment';

	browser &&
		watchUsersLocation(
			async (location) => {
				lsSvelte.set({ usersLocation: location }); // save location into store and localstorage
				//user.addPreferences({ location: location });
			},
			{ enableHighAccuracy: false }
		);
</script>

<script lang="ts">
	import FirebaseNotification from '$lib/components/Common/FirebaseNotification.svelte';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import { Query, appwriteKeys, collections, svelteCollections } from '@app/appwrite-client';
	import type { UserInfoGraphqlDocument } from '@app/ts-types';
	import IconSquareSpace from '$lib/components/Icons/IconSquareSpace.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import IconMap from '$lib/components/Icons/IconMap.svelte';
	import { omit } from 'lodash';

	let foregroundNotification: MessagePayload | undefined;

	onMount(async () => {
		const { notifications } = await import('@app/firebase-client');
		const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			type: 'classic',
			scope: '/'
		});
		await notifications.initUser(data.user.userId, reg);
		notifications.watchNotifications((payload) => (foregroundNotification = payload));
	});

	export let data: LayoutData;

	const usernameSplited = data.user.username.split(' ');

	const usersInitials = `${data.user.username.split(' ')[0][0]} ${
		usernameSplited.length >= 2 && data.user.username.split(' ')[1][0]
	}`;

	onMount(() => {
		collections.userInfo.listenUpdate(data.user._id, (updatedUserInfo) => {
			data.user = Object.assign(data.user, {
				...omit(updatedUserInfo, ...appwriteKeys),
				_updatedAt: updatedUserInfo.$updatedAt,
				_createdAt: updatedUserInfo.$createdAt
			});
		});
	});
</script>

<FirebaseNotification message={foregroundNotification} />

<div class="w-full h-full flex flex-wrap flex-col items-center justify-center">
	<div class="w-full h-[calc(100%-64px)] top-0 absolute overflow-scroll">
		<slot />
	</div>

	<div class="w-full h-auto fixed bottom-0 flex justify-center z-50">
		<BottomNav
			position="relative"
			classInner="grid-cols-4 gap-4"
			class="tran"
			outerClass="mobile:w-full w-fit z-50 h-16 rounded-t-3xl"
		>
			<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="left">
				<IconLocation />
			</BottomNavItem>

			<BottomNavItem on:click={() => goto('/search')}>
				<IconMagnifyingGlass />
			</BottomNavItem>

			<BottomNavItem
				on:click={() => {
					if ($mapOrTakePhoto === 'map' && $page.url.pathname === '/') {
						$mapOrTakePhoto = 'takePhoto';
					} else {
						$mapOrTakePhoto = 'map';
					}
					goto('/');
				}}
			>
				{#if $mapOrTakePhoto === 'map' && $page.url.pathname === '/'}
					<IconPlus />
				{:else}
					<IconMap />
				{/if}
			</BottomNavItem>

			<BottomNavItem on:click={() => goto(`/account/${data.user.myId}`)} appBtnPosition="right">
				<Avatar src={data.user.profilePictureURL}>
					{#if !data.user.profilePictureURL}
						{usersInitials}
					{/if}
				</Avatar>
			</BottomNavItem>
		</BottomNav>
	</div>
</div>
