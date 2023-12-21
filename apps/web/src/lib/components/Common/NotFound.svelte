<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import Center from './Center.svelte';
	import Column from './Column.svelte';
	import Icon from './Icon.svelte';
	import Text from './Text.svelte';

	let className = '';
	export { className as class };
</script>

<Center class={className}>
	<Column>
		<Text>
			{$LL.notFound()}
		</Text>
	</Column>
	<Icon class="child:fill-red-500 w-10 h-10">
		<IconTimes />
	</Icon>
</Center>
