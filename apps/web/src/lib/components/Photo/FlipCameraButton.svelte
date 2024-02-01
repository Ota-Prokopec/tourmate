<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Icon from '../Common/Icon.svelte';
	import IconRotate from '../Icons/IconRotate.svelte';

	let className = '';
	export { className as class };
</script>

<Icon class={twMerge('child:w-8 child:h-8', className)} on:click>
	<IconRotate />
</Icon>
