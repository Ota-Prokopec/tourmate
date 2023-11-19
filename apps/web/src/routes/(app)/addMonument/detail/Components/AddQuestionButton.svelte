<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';
</script>

<Icon
	on:click
	class="bg-green-400 h-14 w-14 rounded-full border border-green-500 hover:bg-green-500"
>
	<IconQuestion />
	<IconPlus />
</Icon>
