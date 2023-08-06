<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import TakePhoto from '$lib/components/Photo/TakePhoto.svelte';
	import type { Base64, Position } from '@app/ts-types';
	import { goto } from '$app/navigation';
	import { mapOrTakePhoto } from '../+layout.svelte';
	import { myNewExperienceStore } from '../createNewExperience/newExperienceStore';

	let myPosition: Position;

	const tookPhoto = (e: CustomEvent<{ base64: string }>) => {
		$myNewExperienceStore = { imageSrc: e.detail.base64, position: myPosition };
		goto(`/createNewExperience`);
	};
</script>

{#if $mapOrTakePhoto === 'map'}
	<Map bind:position={myPosition} />
{:else}
	<TakePhoto on:image={tookPhoto} />
{/if}
