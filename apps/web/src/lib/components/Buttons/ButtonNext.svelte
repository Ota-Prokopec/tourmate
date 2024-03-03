<script lang="ts">
	import BubbleIconWrapper from '../Icons/BubbleIconWrapper.svelte';
	import IconNext from '../Icons/IconNext.svelte';

	export let disabled = false;

	let className = '';
	export { className as class };
</script>

<BubbleIconWrapper {disabled} on:click class={className}>
	<IconNext class="w-8 h-8 fill-white" />
</BubbleIconWrapper>
