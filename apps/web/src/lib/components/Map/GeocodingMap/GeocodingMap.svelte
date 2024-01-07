<script lang="ts">
	import type { Location } from '@app/ts-types';
	import Map from '../Map.svelte';
	import Geocoding from '../Geocoding/Geocoding.svelte';
	import Icon from '../../Common/Icon.svelte';
	import IconMagnifyingGlass from '../../Icons/IconMagnifyingGlass.svelte';
	import GeocodingMapDrawer from './GeocodingMapDrawer.svelte';

	export let userCenter: Location | undefined = undefined;

	export let searchingHidden = true;
</script>

<Map on:dblclick on:moveend bind:userCenter>
	<Icon
		on:click={() => (searchingHidden = false)}
		class="child:w-8 child:h-8 absolute top-0 right-0 m-4 child:fill-black"
	>
		<IconMagnifyingGlass />
	</Icon>
	<GeocodingMapDrawer
		on:select={(e) => (userCenter = e.detail.location)}
		bind:hidden={searchingHidden}
	/>
	<slot />
</Map>
