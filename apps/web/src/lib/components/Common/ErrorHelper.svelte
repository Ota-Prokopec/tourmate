<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	export let timeout: number | undefined = undefined;
	export let message = '';

	$: if (message && timeout) setTimeout(() => (message = ''), timeout);
</script>

<Helper color="red">
	{message}
</Helper>
