<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');
</script>

<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';
	import Notification from '$lib/components/Notification/Notification.svelte';
	import lsSvelte, { storage } from '$lib/utils/lsStore';
	import type { LayoutData } from './$types';
	import Bar from './Components/Bar.svelte';
	import { navigate } from '$lib/utils/navigator';

	export let data: LayoutData;
	let isLoading = true;

	$: if ($lsSvelte.usersLocation) isLoading = false;

	const usernameSplited = data.user.username.split(' ');

	const usersInitials = `${usernameSplited[0]?.at(0)} ${
		usernameSplited.length >= 2 && usernameSplited[1]?.at(0)
	}`;

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

{#if data.user.secondsFromUserCreatedToNow < 4 * 60 * 60}
	<Icon
		on:click={() => navigate('/tutorial')}
		class="absolute z-50 child:h-4 child:w-4 !child:fill-white rounded-full bg-blue-400 p-1 m-1 mt-[25%]"
	>
		<IconQuestion />
	</Icon>
{/if}

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
