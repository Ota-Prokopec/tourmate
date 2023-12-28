<script lang="ts">
	import Eval from '$lib/components/Common/Eval.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconSettings from '$lib/components/Icons/IconSettings.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MonumentMarker from '$lib/components/Map/Markers/MonumentMarker.svelte';
	import MapSettings from '$lib/components/Map/settings/MapSettings.svelte';
	import AlmostProfileWithMainImage from '$lib/components/Pages/AlmostProfileWithMainImage.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import type { Base64, MonumentMarkerData } from '@app/ts-types';
	import { getUsersLocation, metersToDegree } from '@app/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	let location = $lsStore.usersLocation;
	let monumentsPromise: undefined | Promise<{ getListOfMonuments: MonumentMarkerData[] }>;

	const getMonuments = async (range: number) => {
		try {
			monumentsPromise = sdk.getListOfMonumentsForMap({
				location: {
					location:
						location ?? (await getUsersLocation({ maximumAge: 1000, enableHighAccuracy: false })),
					rangeMeters: range
				}
			});
		} catch (error) {
			alert('', $LL.error.monumentLoadErrorMessage(), { color: 'red' });
		}
	};

	getMonuments(data.user.prefs.mapRange);

	let mapZoom: number;

	let almostProfile = false;
	let almostProfileImageSrc: string | Base64;

	let settingsHidden = true;
</script>

<MapSettings
	on:change={(e) => getMonuments(e.detail.range)}
	bind:settingsHidden
	mapRangeValue={JSON.stringify(data.user.prefs.mapRange)}
/>

<Map
	class="w-full h-[100vh] fixed bottom-0 z-20"
	deg={45}
	bind:zoom={mapZoom}
	bind:center={location}
>
	<Icon
		on:click={() => (settingsHidden = false)}
		class="absolute top-0 right-0 m-4 child:fill-black child:w-9 child:h-9"
	>
		<IconSettings />
	</Icon>

	{#await monumentsPromise then monuments}
		{#if monuments}
			{#each monuments.getListOfMonuments as monument}
				<MonumentMarker classDrawer="!pb-bottomNavBarHeightSize" zoom={mapZoom} {monument} />
			{/each}
		{/if}
	{:catch}
		<Eval
			evaluate={alert('', $LL.error.monumentLoadErrorMessage(), {
				color: 'red'
			})}
		/>
	{/await}
</Map>
{#if almostProfile}
	<AlmostProfileWithMainImage
		on:close={() => (almostProfile = false)}
		class="absolute sm:left-0 sm:top-0 sm:m-4 z-[60]"
		userInfo={data.user}
		imgSrc={almostProfileImageSrc}
	/>
{/if}
