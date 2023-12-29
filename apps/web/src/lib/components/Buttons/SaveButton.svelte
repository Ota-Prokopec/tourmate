<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Loading from '../Common/Loading.svelte';
	import LL from '$src/i18n/i18n-svelte';

	export let isLoading = false;
	export let disabled = false;
</script>

<Button on:click {disabled} color="green" class="mt-8">
	{#if isLoading}
		<Loading />
	{:else}
		{$LL.common.save()}
	{/if}
</Button>
