<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';
	import { Button } from 'flowbite-svelte';

	let openEditor = false;

	let location = $lsStore.usersLocation;

	const skip = () => {
		if (!location) {
			alert('', $LL.error.locationNowFoundErrorMessage(), { color: 'red' });
			throw new Error('user has no location');
		}
		navigate(`/createNewExperience/${location.at(0)}-${location.at(1)}`);
	};

	const edit = () => {
		openEditor = true;
	};
</script>

<div class="w-full h-full">
	{#if !openEditor}
		<Column class="h-full w-full justify-center items-center">
			<Button
				on:click={skip}
				color="green"
				class=" flex flex-wrap flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6  !m-0  fill-white"
				>{$LL.skipEditor()}
			</Button>
			<Button
				on:click={edit}
				color="green"
				class=" flex flex-wrap  flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6 !m-0  fill-white"
				>{`${$LL.continue()} ${$LL.toEditor()}`} <Icon><IconNext /></Icon></Button
			>
		</Column>
	{/if}

	{#if openEditor}
		<slot />
	{/if}
</div>
