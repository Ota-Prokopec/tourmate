<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import { Input } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let answer: string = '';

	let className = '';
	export { className as class };
</script>

<Center class={twMerge('', className)}>
	<Input class="h-[50px] w-full" bind:value={answer} />
</Center>
