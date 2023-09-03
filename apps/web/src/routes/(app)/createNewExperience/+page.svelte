<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { myNewExperienceStore } from './newExperienceStore.js';

	export let data;

	const { imgSrc, location } = $myNewExperienceStore;
</script>

<div class="w-full h-full flex justify-center items-center">
	<Img src={imgSrc} />
</div>
