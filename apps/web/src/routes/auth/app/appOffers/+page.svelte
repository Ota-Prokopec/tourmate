<script lang="ts">
	import { Queries, collections } from '$lib/appwrite/appwrite';
	import Card from '$lib/components/Common/Card.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import { AnimatedCounter } from '@benzara/svelte-animated-counter';

	$: monumentsCount = useQuery('monumentsCount', async () => {
		return (await collections.monument.listDocuments([Queries.monument.limit(1)])).total;
	});
</script>

<Card class="justify-center items-center flex mobile:w-full min-h-[400px] !p-10 sm:min-w-[400px]">
	<Text class="text-9xl font-bold text-center">
		{#if $monumentsCount.data}
			<AnimatedCounter
				values={Array.from({ length: $monumentsCount.data }, (_, i) => i.toString())}
				class="custom-counter"
				interval={35}
				startImmediately={true}
				direction="up"
				loop={false}
				ease="cubic-bezier(0.25, 0.1, 0.25, 1)"
				initialValue="0"
			/>
		{:else}
			0
		{/if}
	</Text>
	<Text class="text-3xl">
		{$LL.page.monumentsCount.label()}
	</Text>
</Card>
