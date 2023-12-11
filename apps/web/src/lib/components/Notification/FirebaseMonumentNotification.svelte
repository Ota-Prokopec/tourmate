<script lang="ts">
	import MonumentCardComponent from '../Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import Text from '../Common/Text.svelte';
	import Center from '../Common/Center.svelte';
	import { sdk } from '$src/graphql/sdk';
	import LL from '$src/i18n/i18n-svelte';

	export let monumentId: string;

	$: monumentCardPromise = sdk.getMonumentCard({ id: monumentId });
</script>

{#await monumentCardPromise then monumentCard}
	<Center class="z-[9999] absolute top-0 max-w-[500px] w-[95%] m-2 pt-4">
		<MonumentCardComponent dismissable size="tiny" monument={monumentCard.getMonument}>
			<Text class="text-xl w-full text-left" slot="dismissArea">{$LL.newMonumentWasAdded()}</Text>
		</MonumentCardComponent>
	</Center>
{/await}
