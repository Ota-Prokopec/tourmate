<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Icon from '../Common/Icon.svelte';
	import IconNext from '../Icons/IconNext.svelte';
	import LL from '$src/i18n/i18n-svelte';
</script>

<Button
	on:click
	color="blue"
	class=" flex flex-wrap  flex-row gap-2 top-0 right-0 text-2xl mr-6 ml-6 !m-0  fill-white"
	>{$LL.component.CancelButton.label()}
</Button>
