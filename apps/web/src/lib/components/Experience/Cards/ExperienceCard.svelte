<script lang="ts">
	import type { Experience } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let experience: Experience;

	let className = '';
	export { className as class };

	$: imgSrcAsString = experience.imgSrc as unknown as string;
</script>

<Card class={twMerge('max-w-[75%] justify-self-center', className)}>
	<Img class="rounded-lg object-cover " src={imgSrcAsString} />
</Card>
