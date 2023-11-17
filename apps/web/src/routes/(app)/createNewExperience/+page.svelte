<script lang="ts">
	import { goto } from '$app/navigation';
	import Center from '$lib/components/Common/Center.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconCamera from '$lib/components/Icons/IconCamera.svelte';
	import IconPicture from '$lib/components/Icons/IconPicture.svelte';
</script>

<Center class="w-full h-full">
	<Row class="gap-16">
		<Icon on:click={() => goto('/createNewExperience/takePicture')}
			><IconCamera class="w-16 h-16" /></Icon
		>
		<Icon on:click={() => goto('/createNewExperience/gallery')}
			><IconPicture class="w-16 h-16" /></Icon
		>
	</Row>
</Center>
