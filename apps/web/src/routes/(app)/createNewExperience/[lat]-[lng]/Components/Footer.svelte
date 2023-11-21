<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ save: undefined }>();

	export let ableToSave: boolean;
	export let isLoading: boolean;
	export let monument: MonumentCard | undefined;
	let correctlyAnswered = monument?.question ? false : null;

	let showDrawerForAnsweringTheQuestion = false;

	const questionAbleToSave = (monument?.question && correctlyAnswered) || !monument?.question;

	const anwerQuestion = async () => {};
</script>

<Column class="w-full gap-4 p-4">
	{#if monument?.question}
		<Button color="green" on:click={() => (showDrawerForAnsweringTheQuestion = true)}>
			<Column class="justify-center items-center gap-2">
				answer the question
				<Icon class="child:h-5 child:w-5 child:rotate-90 child:fill-white">
					<IconNext />
				</Icon>
			</Column>
		</Button>
	{/if}

	<Button
		color="green"
		on:click={() => dispatch('save')}
		disabled={!ableToSave || !questionAbleToSave}
	>
		{#if isLoading}
			<Loading />
		{:else}
			<span>Zveřejnit</span>
		{/if}
	</Button>
</Column>
