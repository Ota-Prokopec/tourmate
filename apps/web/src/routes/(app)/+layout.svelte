<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { collections } from '$lib/appwrite/appwrite';
	import GpsOffAlert from '$lib/components/Alert/GPSOffAlert.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Notification from '$lib/components/Notification/Notification.svelte';
	import lsSvelte, { lsStore, storage } from '$lib/utils/lsStore';
	import { appwriteKeys } from '@app/appwrite-client';
	import lodash from 'lodash';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	//real-time user update
	if (browser)
		collections.userInfo.listenUpdate(data.user._documentId, (updatedUserInfo) => {
			data.user = Object.assign(data.user, {
				...lodash.omit(updatedUserInfo, ...appwriteKeys),
				_updatedAt: updatedUserInfo.$updatedAt,
				_createdAt: updatedUserInfo.$createdAt
			});
		});

	let isLoading = true;

	$: if ($lsSvelte.usersLocation) isLoading = false;

	//this is for /createNewExperience/[]/[] so when i am getting back from that and i have a picture stored in lsStore => i have to delete it that i did not have it there infinite years =>  the picture is there only for being it restored when user reloads the page
	beforeNavigate((e) => {
		const includesNewExperienceCreate = e.from?.route.id?.includes(
			'/(app)/createNewExperience/[lat]-[lng]/[monumentId]'
		); //this means that you are getting back from creating the monument so it menas i have to delete a picture from lsStore
		if (includesNewExperienceCreate) storage.newExperiencePicture = undefined;
	});
</script>

<!--service-worker for notifications in Notification component-->
<Notification userId={data.user.userId} />

{#if !$lsStore.usersLocation}
	<GpsOffAlert />
{/if}

{#if isLoading}
	<FullPageLoading />
{:else}
	<slot />
{/if}
