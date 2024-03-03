<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Row from '../Common/Row.svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRoute from '../Icons/IconRoute.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { navigate } from '$lib/utils/navigator';
	import { twMerge } from 'tailwind-merge';

	export let size: 'small' | 'normal' = 'normal';
	export let link: '/tour' | '/tour/create' = '/tour';

	let className = '';
	export { className as class };
</script>

<Button
	on:click={() => navigate(link)}
	class={twMerge(size === 'small' && '!rounded-full w-12 h-12', className)}
	color="green"
>
	<Row class="gap-2">
		{#if size === 'normal'}
			{$LL.component.ButtonCreateTour.label()}
		{/if}
		<Icon class="child:w-5 child:h-5 child:fill-white">
			<IconRoute />
		</Icon>
	</Row>
</Button>
