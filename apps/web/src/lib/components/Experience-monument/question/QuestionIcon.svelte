<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';

	export let popover: string | null = null;
</script>

<Icon>
	<IconQuestion />
</Icon>
{#if popover}
	<Popover color="blue">
		{popover}
	</Popover>
{/if}
