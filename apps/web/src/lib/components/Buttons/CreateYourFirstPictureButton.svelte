<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
</script>

<Button on:click={() => goto(`/`)} class="bg-white border border-gray-400 ">
	<Text class="!text-black">{$LL.component.CreateYourFirstPictureButton.label()}</Text>
	<Icon class="fill-red-500 w-7 h-7">
		<IconLocation />
	</Icon>
</Button>
