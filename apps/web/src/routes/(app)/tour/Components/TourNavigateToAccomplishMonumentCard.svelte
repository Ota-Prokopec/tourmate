<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import AnswerQuestionDrawer from '../../createNewExperience/[lat]-[lng]/Components/AnswerQuestionDrawer.svelte';

	const dispatch = createEventDispatcher<{ dismiss: undefined; accomplish: undefined }>();

	export let monument: MonumentCard;

	export let answerQuestionDrawerHidden = true;
</script>

<Card dismissable class="absolute z-50 w-[80%] h-auto m-[10%]">
	<Column class="gap-2">
		<Text
			class="font-bold text-center
    ">{$LL.component.TourNavigateToAccomplishMonumentCard.title()}</Text
		>

		<MonumentCardComponent size="tiny" {monument} />

		<Button color="green" on:click={() => (answerQuestionDrawerHidden = false)}>
			answer question (overwrite)
		</Button>

		{#if monument.question}
			<AnswerQuestionDrawer
				bind:hidden={answerQuestionDrawerHidden}
				usersAnswer={null}
				isLoading={false}
				question={monument.question}
			/>
		{/if}

		<Row class="w-full h-auto gap-2 justify-end flex">
			<Button on:click={() => dispatch('dismiss')} color="red">{$LL.common.no()}</Button>
			<Button on:click={() => dispatch('accomplish')} color="green">{$LL.common.yes()}</Button>
		</Row>
	</Column>
</Card>
