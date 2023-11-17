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
</script>

<script lang="ts">
	import FirebaseNotification from '$lib/components/Common/FirebaseNotification.svelte';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import { collections } from '../../lib/appwrite/appwrite';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import IconMap from '$lib/components/Icons/IconMap.svelte';
	import { omit } from 'lodash';
	import { appwriteKeys } from '@app/appwrite-client';
	import * as permissions from '@app/appwrite-permissions';
	import RiDeviceScan2Line from 'svelte-icons-pack/ri/RiDeviceScan2Line';
	import IconPach from '$lib/components/Icons/IconPach.svelte';

	export let data: LayoutData;

	let foregroundNotification: MessagePayload | undefined;

	$: browser &&
		watchUsersLocation(
			async (location) => {
				lsSvelte.set({ usersLocation: location }); // save location into store and localstorage
			},
			{ enableHighAccuracy: false }
		);

	onMount(async () => {
		const { notifications } = await import('@app/firebase-client');
		const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			type: 'classic',
			scope: '/'
		});
		const token = await notifications.initUser(data.user.userId, reg);
		try {
			await collections.token.createDocument(
				{
					userId: data.user.userId,
					fcmFirebaseToken: token
				},
				permissions.owner(data.user.userId)
			);
		} catch (error) {}

		notifications.watchNotifications((payload) => (foregroundNotification = payload));
	});

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
			classInner="flex flex-wrap flex-row justify-between"
			class=""
			outerClass="mobile:w-full w-[500px] z-50 h-16"
		>
			<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="left">
				<IconLocation />
			</BottomNavItem>

			<BottomNavItem on:click={() => goto('/scan')}>
				<IconPach src={RiDeviceScan2Line} />
			</BottomNavItem>

			<BottomNavItem on:click={() => goto('/search/places/*')}>
				<IconMagnifyingGlass />
			</BottomNavItem>

			<BottomNavItem
				on:click={() => {
					if ($page.url.pathname === '/') {
						goto('/createNewExperience');
					} else {
						goto('/');
					}
				}}
			>
				{#if $mapOrTakePhoto === 'map' && $page.url.pathname === '/'}
					<IconPlus />
				{:else}
					<IconMap />
				{/if}
			</BottomNavItem>

			<BottomNavItem on:click={() => goto(`/account/${data.user.myId}`)} appBtnPosition="right">
				<Avatar class="w-10 h-10" src={data.user.profilePictureURL}>
					{#if !data.user.profilePictureURL}
						{usersInitials}
					{/if}
				</Avatar>
			</BottomNavItem>
		</BottomNav>
	</div>
</div>
