<script lang="ts">
	import ClickOutside from '$lib/components/Common/ClickOutside.svelte';
	import { twMerge } from 'tailwind-merge';
	import Carousel from '../../Carousel/Carousel.svelte';
	import Input from '$lib/components/Common/Input.svelte';

	export let options: {
		color: string;
		index: number;
		texts: string[];
	};

	let className = '';
	export { className as class };
</script>

<ClickOutside>
	<div class={twMerge('absolute bottom-0 w-full left-0 p-2 mb-14', className)}>
		<Carousel arrows bind:index={options.index} class="w-full" swiping>
			{#each options.texts as label}
				<Input class={('w-full', className)} style={`color: ${options.color}`} bind:value={label} />
			{/each}
		</Carousel>
	</div>
</ClickOutside>
