<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Experience, GraphqlDocument } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let experience: GraphqlDocument<Experience>;

	let className = '';
	export { className as class };

	$: imgSrcAsString = experience.imgSrc as unknown as string;

	const click = () => {
		goto(`/experience/${experience._id}`);
	};
</script>

<Card on:click={click} class="p-[4px] h-min" padding="none">
	<Img class={twMerge('w-40 h-auto rounded-lg', className)} src={imgSrcAsString} />
</Card>
