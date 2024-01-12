<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { Color } from './Alert';

	export let color: Color = 'blue';
	export let dismissable: true | false = false;
	export let visible: boolean = true;

	export let timeout = 0;
	let timer: ReturnType<typeof setTimeout>;
	$: if (visible && timeout) timer = setTimeout(() => (visible = false), timeout);

	let className = '';
	export { className as class };
</script>

{#if visible}
	<Alert
		on:click
		shadow
		on:close={() => (visible = false)}
		{dismissable}
		class={twMerge(
			'rounded-xl max-w-[500px] z-[9999] max-h-[300px] ml-auto mr-auto mt-5 absolute',
			className
		)}
		on:close
		{color}
	>
		<span slot="icon" />
		<span class="text-lg break-all"><slot name="title" /></span>
		<div>
			<div class="mt-2 mb-4 text-sm break-words"><slot /><slot name="message" /></div>
			<div class="flex gap-2">
				<slot name="buttons" />
			</div>
		</div>
	</Alert>
{/if}
