<script lang="ts">
	import { SyncLoader } from 'svelte-loading-spinners';
	import Icon from '../Common/Icon.svelte';
	import Input from '../Common/Input.svelte';
	import IconMagnifyingGlass from '../Icons/IconMagnifyingGlass.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ search: { searchingText: string } }>();

	export let value = '';
	export let autoSearching = false;
	export let isLoading = false;

	const search = (searchingText: string) => dispatch('search', { searchingText });

	$: if (autoSearching) search(value);
</script>

<Input
	bind:value
	class="max-w-full w-[400px]"
	ableClickIcon
	icon
	on
	iconPosition="right"
	on:iconClick={() => search(value)}
>
	{#if isLoading}
		<SyncLoader color="black" size="30" unit="px" />
	{:else}
		<Icon on:click={() => search(value)}>
			<IconMagnifyingGlass />
		</Icon>
	{/if}
</Input>
