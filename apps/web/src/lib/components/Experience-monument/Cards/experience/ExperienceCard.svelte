<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Common/Card.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import type { Experience, ExperienceCard, GraphqlDocument } from '@app/ts-types';
	import { Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';

	export let experience: ExperienceCard;
	export let disableReRouting = false;
	$: imgSrcAsString = experience.imgSrc as unknown as string;
	export let dismissable = false;
	let liked: boolean | 'pending' = experience.liked ? true : false;

	const onClick = () => {
		if (disableReRouting) return;
		goto(`/experience/${experience._id}`);
	};

	let className = '';
	export { className as class };
</script>

<Card
	on:click={onClick}
	on:dismiss
	{dismissable}
	class={twMerge('relative justify-self-center gap-2', className)}
>
	<UserItem user={experience.user} />
	<CardImage on:like imgSrc={imgSrcAsString} />
	<Img class={twMerge('w-full h-auto rounded-lg', className)} src={imgSrcAsString} />
</Card>
