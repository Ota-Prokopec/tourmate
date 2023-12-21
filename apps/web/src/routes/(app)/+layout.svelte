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
	import Bar from './Components/Bar.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';

	export let data: LayoutData;
	let isLoading = true;

	$: if ($lsSvelte.usersLocation) isLoading = false;

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

{#if isLoading}
	<FullPageLoading />
{:else}
	<div class="w-full h-full flex flex-wrap flex-col items-center justify-center">
		<div class="w-full h-[calc(100%-64px)] top-0 absolute overflow-scroll">
			<slot />
		</div>

		<div class="w-full h-auto fixed bottom-0 flex justify-center z-50">
			<Bar
				userId={data.user.myId}
				profilePictureURL={data.user.profilePictureURL}
				{usersInitials}
			/>
		</div>
	</div>
{/if}
