<script lang="ts">
	import Input from '../Common/Input.svelte';
	import IconEnvelope from '../Icons/IconEnvelope.svelte';
	import { twMerge } from 'tailwind-merge';
	export let value: string = '';

	let className = '';
	export { className as class };
</script>

<Input
	icon
	class={twMerge('w-full !rounded-3xl', className)}
	bind:value
	placeholder="Zadejte email"
>
	<IconEnvelope />
</Input>
