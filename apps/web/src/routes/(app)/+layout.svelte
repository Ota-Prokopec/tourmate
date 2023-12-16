<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import type { MessagePayload } from 'firebase/messaging';
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { writable } from 'svelte/store';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');

	import { browser } from '$app/environment';
	import lsSvelte from '$lib/utils/lsStore';
	import { watchUsersLocation } from '@app/utils';
</script>

<script lang="ts">
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import IconMap from '$lib/components/Icons/IconMap.svelte';
	import IconPach from '$lib/components/Icons/IconPach.svelte';
	import { appwriteKeys } from '@app/appwrite-client';
	import * as permissions from '@app/appwrite-permissions';
	import { omit } from 'lodash';
	import { onMount } from 'svelte';
	import RiDeviceScan2Line from 'svelte-icons-pack/ri/RiDeviceScan2Line';
	import { collections } from '../../lib/appwrite/appwrite';
	import type { LayoutData } from './$types';
	import Notification from '$lib/components/Notification/Notification.svelte';

	export let data: LayoutData;

	$: browser &&
		watchUsersLocation(
			async (location) => {
				lsSvelte.set({ usersLocation: location }); // save location into store and localstorage
			},
			{ enableHighAccuracy: false }
		);

	const usernameSplited = data.user.username.split(' ');

	const usersInitials = `${usernameSplited[0]?.at(0)} ${
		usernameSplited.length >= 2 && usernameSplited[1]?.at(0)
	}`;

	onMount(() => {
		collections.userInfo.listenUpdate(data.user._documentId, (updatedUserInfo) => {
			data.user = Object.assign(data.user, {
				...omit(updatedUserInfo, ...appwriteKeys),
				_updatedAt: updatedUserInfo.$updatedAt,
				_createdAt: updatedUserInfo.$createdAt
			});
		});
	});
</script>

<Notification userId={data.user.userId} />

<div class="w-full h-full flex flex-wrap flex-col items-center justify-center">
	<div class="w-full h-[calc(100%-64px)] top-0 absolute overflow-scroll">
		<slot />
	</div>

	<div class="w-full h-auto fixed bottom-0 flex justify-center z-50">
		<BottomNav
			position="relative"
			classInner="flex flex-wrap flex-row justify-between "
			class=""
			outerClass="mobile:w-full w-[500px] z-50 h-16 dark:bg-black rounded-3xl mobile:rounded-none"
		>
			<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="left">
				<Icon>
					<IconLocation class="fill-black dark:fill-white" />
				</Icon>
			</BottomNavItem>

			<BottomNavItem on:click={() => goto('/scan')}>
				<Icon>
					<IconPach src={RiDeviceScan2Line} />
				</Icon>
			</BottomNavItem>

			<BottomNavItem on:click={() => goto('/search/places/*')}>
				<Icon>
					<IconMagnifyingGlass />
				</Icon>
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
				<Icon>
					{#if $mapOrTakePhoto === 'map' && $page.url.pathname === '/'}
						<IconPlus />
					{:else}
						<IconMap />
					{/if}
				</Icon>
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
