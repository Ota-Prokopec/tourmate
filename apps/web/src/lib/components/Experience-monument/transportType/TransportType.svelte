<script lang="ts">
	import type { Transport } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ choose: Transport[] }>();
	import { transports } from './transports';
	import ChooseFromIcons from '$lib/components/ChooseFromIcons/ChooseFromIcons.svelte';

	export let chosenTransports: Transport[] = [];

	$: dispatch('choose', chosenTransports);

	let className = '';
	export { className as class };
</script>

<ChooseFromIcons
	class={className}
	on:change={(e) => (chosenTransports = e.detail)}
	data={transports}
/>
