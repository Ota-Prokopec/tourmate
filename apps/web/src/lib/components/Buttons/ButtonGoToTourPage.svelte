<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Row from '../Common/Row.svelte';
	import Icon from '../Common/Icon.svelte';
	import IconRoute from '../Icons/IconRoute.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { navigate } from '$lib/utils/navigator';
	import { twMerge } from 'tailwind-merge';

	let className = '';
	export { className as class };
</script>

<Button on:click={() => navigate('/tour')} class={twMerge('', className)} color="green">
	<Row class="gap-2">
		{$LL.component.ButtonGoToTourPage.label()}
		<Icon class="child:w-5 child:h-5 child:fill-white">
			<IconRoute />
		</Icon>
	</Row>
</Button>
