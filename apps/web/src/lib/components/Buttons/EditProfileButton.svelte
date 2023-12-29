<script lang="ts">
	import { goto } from '$app/navigation';
	import Left from '$lib/components/Common/Left.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';

	export let myId: string;
</script>

<Left>
	<Button on:click={() => goto(`${myId}/edit`)} color="green">
		{$LL.component.EditProfileButton.label()}
	</Button>
</Left>
