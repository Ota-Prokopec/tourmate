<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	export let color:
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'purple'
		| 'pink'
		| 'blue'
		| 'light'
		| 'dark'
		| 'default'
		| 'dropdown'
		| 'navbar'
		| 'navbarUl'
		| 'form'
		| 'primary'
		| 'orange'
		| 'none'
		| undefined = 'blue';
	export let dismissable: true | false = false;
	export let accent: boolean = true;
	export let visible: boolean = true;

	let className = '';
	export { className as class };
</script>

{#if visible}
	<Alert
		shadow
		{dismissable}
		class={`rounded-xl max-w-[500px] z-[9999] max-h-[300px] ml-auto mr-auto mt-5 absolute ${className}`}
		on:close
		{color}
	>
		<span slot="icon" />
		<span class="text-lg font-medium"><slot name="title" /></span>
		<div>
			<div class="mt-2 mb-4 text-sm"><slot /><slot name="message" /></div>
			<div class="flex gap-2">
				<slot name="buttons" />
			</div>
		</div>
	</Alert>
{/if}
