<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
</script>

<Button on:click color="red">
	{$LL.component.LogOutButton.label()}
</Button>
