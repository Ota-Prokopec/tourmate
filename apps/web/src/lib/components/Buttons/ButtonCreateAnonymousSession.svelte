<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button, Checkbox } from 'flowbite-svelte';
	import Popover from '../Common/Popover.svelte';

	export let readWarning = false;
</script>

<Button disabled={!readWarning} on:click color="dark">
	{$LL.component.ButtonCreateAnonymousSession.label()}
</Button>

<Popover trigger="hover" placement="top" color="red">
	{$LL.component.ButtonCreateAnonymousSession.warningPopup.message()}
	<Checkbox bind:checked={readWarning}>
		{$LL.component.ButtonCreateAnonymousSession.warningPopup.iRead()}
	</Checkbox>
</Popover>
