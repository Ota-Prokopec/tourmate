<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import { Input, NumberInput } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let answer: number = 0;
	export let type: 'answering' | 'creating-question';

	let className = '';
	export { className as class };
</script>

<Center class={twMerge('', className)}>
	<NumberInput type="number" class="h-[50px] w-full" bind:value={answer} />
</Center>
