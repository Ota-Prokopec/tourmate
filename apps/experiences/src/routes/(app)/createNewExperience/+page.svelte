<script lang="ts">
	import { Card, Img } from 'flowbite-svelte';
	import { myNewExperienceStore } from './newExperienceStore';
	import Button from '$lib/components/Common/Button.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { trpc } from '$lib/trpc.js';
	import { page } from '$app/stores';
	import Loading from '$lib/components/Common/Loading.svelte';
	import MyAlert from '$lib/components/Common/MyAlert.svelte';
	import { goto } from '$app/navigation';

	export let data;

	$: console.log(location);

	const { imgSrc, location } = $myNewExperienceStore;

	let state: 'loading' | 'success' | 'failure' | null = null;

	$: if (state === 'success') {
		setTimeout(() => goto('/'), 1500);
	}

	const publicExp = async () => {
		try {
			state = 'loading';
			const res = await trpc($page).experience.create.mutate($myNewExperienceStore);
			state = 'success';
		} catch (error) {
			state = 'failure';
		}
	};
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if state === null}
		{#if state === 'failure'}
			<MyAlert color="red">Error</MyAlert>
		{/if}
		<Img src={imgSrc} />
		<div class="w-full h-auto p-5 absolute bottom-0 justify-end flex">
			<Button on:click={publicExp} class="bg-blue-400 flex gap-4 rounded-full w-auto">
				{#if state === 'loading'}
					<Loading />
				{:else}
					Zveřejnit
				{/if}

				<IconNext class="w-10" /></Button
			>
		</div>
	{:else if state === 'success'}
		<Card class="!w-full h-full max-w-none p-0 m-0 animate-cardShrinking">
			<Img class="w-full" src={imgSrc} />
		</Card>
	{/if}
</div>
