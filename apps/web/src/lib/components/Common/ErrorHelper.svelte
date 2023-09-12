<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	export let timeout: number | undefined = undefined;
	export let message = '';

	let timer: ReturnType<typeof setTimeout>;

	$: if (message && timeout) timer = setTimeout(() => (message = ''), timeout);
</script>

<Helper color="red">
	{message}
</Helper>
