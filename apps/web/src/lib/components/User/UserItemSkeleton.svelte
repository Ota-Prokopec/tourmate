<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Avatar from '../Common/Avatar.svelte';
	import Row from '../Common/Row.svelte';
	import SkeletonLine from '../Common/SkeletonLine.svelte';
	import Column from '../Common/Column.svelte';

	export let disableMyId = false;

	let className = '';
	export { className as class };
	export let avatarClass = '';
</script>

<button class={twMerge('flex items-center space-x-4', className)}>
	<Avatar class={twMerge('rounded-full w-14 h-14', avatarClass)} />
	<Column class="gap-1">
		<SkeletonLine class="w-[150px] h-[15px]" />
		{#if disableMyId}
			<SkeletonLine class="w-[100px] h-[10px]" />
		{/if}
	</Column>
</button>
