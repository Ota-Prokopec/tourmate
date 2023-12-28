<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { twMerge } from 'tailwind-merge';
	import IconTimes from '../Icons/IconTimes.svelte';
	import Center from './Center.svelte';
	import Column from './Column.svelte';
	import Icon from './Icon.svelte';
	import Text from './Text.svelte';
	import Row from './Row.svelte';

	let className = '';
	export { className as class };
</script>

<Center
	class={twMerge(
		'w-full max-w-[300px] mobile:max-w-none h-[100px] border border-gray-400 rounded-3xl ',
		className
	)}
>
	<Row class="justify-between items-center gap-[10px]">
		<Text class="text-xl">
			{$LL.component.NoContent.notFound()}
		</Text>
		<Icon disabled class="child:fill-red-500 child:w-10 child:h-10">
			<IconTimes />
		</Icon>
	</Row>
</Center>
