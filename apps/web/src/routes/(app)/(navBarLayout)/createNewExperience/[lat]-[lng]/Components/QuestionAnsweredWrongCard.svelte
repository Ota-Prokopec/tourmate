<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import FailureCard from '$lib/components/Cards/FailureCard.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
</script>

<FailureCard class="w-full h-auto min-h-[400px] ">
	<Column class="gap-0 mt-10">
		<Text class="">
			{$LL.component.QuestionAnsweredWrongCard.title()}
		</Text>
		<Text class="">
			{$LL.component.QuestionAnsweredWrongCard.notAbleToTakeAPictureWithTheMonument()}
		</Text>
	</Column>
</FailureCard>
