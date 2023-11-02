<script>
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<div
	class={twMerge(
		'w-full flex flex-wrap flex-row justify-end gap-4 pr-4 pl-4 items-center',
		className
	)}
>
	<slot />
</div>
