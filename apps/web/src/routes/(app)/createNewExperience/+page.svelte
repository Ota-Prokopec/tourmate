<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { myNewExperienceStore } from './newExperienceStore.js';
	import FilerobotImageEditor from 'filerobot-image-editor';

	const { imgSrc, location } = $myNewExperienceStore;
</script>

<div class="w-full h-full flex justify-center items-center">
	<Img src={imgSrc} />
</div>
