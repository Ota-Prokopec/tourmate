<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Img } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';

	export let data: PageData;

	const cardURL = data.monument.pictureURL as unknown as string;
</script>

<div class="w-full h-auto flex items-center flex-wrap flex-col gap-4">
	<Card class="w-full h-min m-4 sm:absolute sm:left-0 z-50 gap-4 p-0 rounded-xl">
		<Img class="w-full rounded-xl" src={cardURL} />
		<div class="w-full h-auto p-4">
			<Icon icon="fas fa-map-marker-alt" class="text-3xl text-red-500" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{data.monument.name}
			</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400 flex flex-wrap flex-col gap-2">
				<span>lokace: [{data.monument.location}]</span>
				<span>místo: {data.monument.placeDetail.name}</span>
				<span> {data.monument.about}</span>
				<button>
					<UserItem
						user={{
							myId: data.monument.creator.myId,
							username: data.monument.creator.username,
							profilePictureURL: data.monument.creator.profilePictureURL,
							userId: data.monument.creatorUserId
						}}
					/>
					<Popover>
						<AlmostProfileWithMainImage
							disableCloseButton
							class=""
							userInfo={data.monument.creator}
						/>
					</Popover>
				</button>
			</p>
		</div>
	</Card>

	<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
		<Marker class="z-50" location={data.monument.location}>
			<Icon icon="fas fa-map-marker-alt" class="text-4xl text-red-500" />
		</Marker>
	</Map>
</div>
