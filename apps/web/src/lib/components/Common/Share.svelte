<script lang="ts">
	import IconShare from '../Icons/IconShare.svelte';
	import Icon from './Icon.svelte';

	export let shareData: ShareData;
	const canShare = navigator.canShare ? navigator.canShare(shareData) : false;

	const share = () => {
		if (!canShare) throw new Error('Your browser does not support sharing');
		navigator.share(shareData);
	};

	let className = '';
	export { className as class };
</script>

{#if canShare}
	<Icon on:click={share} class={className}>
		<IconShare class="w-6 h-6" />
	</Icon>
{/if}
