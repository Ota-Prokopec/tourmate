<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { myNewExperienceStore } from './newExperienceStore.js';

	export let data;

	const { imageSrc, position } = $myNewExperienceStore;
</script>

<Img src={imageSrc} />
