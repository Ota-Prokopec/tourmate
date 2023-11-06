<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Img } from 'flowbite-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import { device } from '@app/utils';
	import MonumentCard from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Text from '$lib/components/Common/Text.svelte';

	export let data: PageData;

	const cardURL = data.monument.pictureURL as unknown as string;

	let userPopoverPlacement: 'bottom' | 'right' =
		device.recognizeWidth() === 'mobile' ? 'bottom' : 'right';
</script>

<div class="w-full h-auto flex items-center relative flex-wrap flex-col gap-4">
	<MonumentCard
		disableSeeMoreButton
		size="normal"
		class="absolute top-0 left-0 z-50"
		monument={data.monument}
	>
		<Text class="ml-2 mt-4">
			{data.monument.about}
		</Text>
	</MonumentCard>

	<Map location={data.monument.location} class="h-[100dvh] fixed top-0">
		<Marker class="z-50" location={data.monument.location}>
			<Icon icon="fas fa-map-marker-alt" class="text-4xl text-red-500" />
		</Marker>
	</Map>
</div>
