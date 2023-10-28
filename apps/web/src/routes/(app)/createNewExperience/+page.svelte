<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import IconCamera from '$lib/components/Icons/IconCamera.svelte';
	import IconPicture from '$lib/components/Icons/IconPicture.svelte';
	import { myNewExperienceStore } from './editPicture/newExperienceStore';
	import lsStore from '$lib/utils/lsStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const { usersLocation } = $lsStore;
		if (!usersLocation)
			throw new Error('usersLocation is not set in localStorage (using $lsStore)');
		$myNewExperienceStore.location = usersLocation;
	});
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
