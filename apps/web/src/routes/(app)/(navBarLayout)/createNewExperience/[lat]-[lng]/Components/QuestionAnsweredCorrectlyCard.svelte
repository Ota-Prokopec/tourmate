<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import SuccessCard from '$lib/components/Common/SuccessCard.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
</script>

<SuccessCard class="w-full h-auto min-h-[400px] ">
	<Column class="gap-0 mt-10">
		<Text class="text-green-400 ">
			{$LL.component.QuestionAnsweredCorrectlyCard.title()}
		</Text>
		<Text class="">
			{$LL.component.QuestionAnsweredCorrectlyCard.nowYouCanTakePictureWithTheMonument()}
		</Text>
	</Column>
</SuccessCard>
