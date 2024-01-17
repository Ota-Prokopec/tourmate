<script lang="ts">
	import { navigate } from '$lib/utils/navigator';
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';

	let className = '';
	export { className as class };
</script>

<Button on:click={() => navigate('/auth/app/appOffers')} class={className} color="green">
	{$LL.component.WhatAppOffersButton.label()}
</Button>
