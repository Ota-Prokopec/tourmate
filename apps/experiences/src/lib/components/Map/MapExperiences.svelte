<script lang="ts">
	import type { Experience, LoadedExperience, Location } from '@app/ts-types';
	import Map from './Map.svelte';
	import MarkerImage from './MarkerImage.svelte';

	export let isLoading: undefined | boolean = undefined;
	export let zoom: number | undefined = undefined;
	export let location: Location | undefined = undefined;
	export let experiences: LoadedExperience[];
	export let stacked: boolean = false;

	let className = '';
	export { className as class };
</script>

<Map {isLoading} bind:zoom bind:location>
	{#each experiences as experience, index}
		<MarkerImage
			class={className}
			stacked={sameLocation[JSON.stringify(experiencesLocations[index])] > 1 ? true : false}
			on:almostProfile={(e) => {
				almostProfile = true;
				almostProfileImageSrc = e.detail.imgSrc;
			}}
			zoom={mapZoom}
			imgSrc={experience.imgSrc}
			location={[
				experience.location[0],
				experience.location[1] + howManyBeforeMe(experience.location, index) * 0.00008
			]}
		/>
	{/each}
</Map>
