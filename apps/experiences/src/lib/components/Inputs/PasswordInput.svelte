<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Input from '../Common/Input.svelte';
	import IconEye from '../Icons/IconEye.svelte';

	export let value = '';
	export let placeholder = 'Zadejte heslo';

	let className = '';
	export { className as class };
</script>

<Input
	let:active
	iconFunction="password"
	icon
	class={twMerge('w-full !rounded-3xl', className)}
	bind:value
	{placeholder}
>
	<IconEye {active} />
</Input>
