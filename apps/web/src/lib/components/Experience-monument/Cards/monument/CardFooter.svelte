<script lang="ts">
	import ChooseFromIconsItem from '$lib/components/ChooseFromIcons/ChooseFromIconsItem.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { topics } from '../../topic/topics';
	import { at } from 'lodash';
	import { transports } from '../../transportType/transports';
	import Column from '$lib/components/Common/Column.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import { getTimeFromAToB, normalizeTime } from '@app/utils';
	import { DateTime } from 'luxon';
	import LL from '$src/i18n/i18n-svelte';
	import TypeWriter from '$lib/components/Common/TypeWriter.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';
	import QuestionIcon from '../../question/QuestionIcon.svelte';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let monument: MonumentCard;
	export let liked: boolean | 'pending';
	export let amIOwner: boolean;
	export let usersLocation: Location | undefined;
</script>

<Row class="w-full justify-between">
	<LikeSection
		ableToLike={!amIOwner}
		on:like={() => dispatch('like')}
		on:unlike={() => dispatch('unlike')}
		data={{
			liked: liked ? true : false,
			otherUsersThatLiked: monument.likes.map((l) => l.user)
		}}
	/>
	<Column class="gap-1">
		<Row>
			{#each monument.topics as topic}
				<ChooseFromIconsItem circuit={false}>
					<svelte:component this={topics.filter((t) => t.key === topic)[0].component} />
				</ChooseFromIconsItem>
			{/each}
		</Row>
		<Row>
			{#each monument.transports as transportKey}
				{@const transport = transports.filter((t) => t.key === transportKey)[0]}
				<ChooseFromIconsItem circuit={false}>
					<svelte:component this={transport.component} />
				</ChooseFromIconsItem>
				{#if usersLocation}
					{@const seconds = Math.floor(
						getTimeFromAToB(usersLocation, monument.location, transport.speed)
					)}

					{#if seconds !== 0}
						<Popover class="w-[300px]" placement="bottom">
							<TypeWriter speed={10}>
								{normalizeTime(seconds, $LL.and())}
							</TypeWriter>
						</Popover>
					{/if}
				{/if}
			{/each}
		</Row>
		{#if monument.question}
			<QuestionIcon popover={$LL.monumentIncludesQuestion()} />
		{/if}
	</Column>
</Row>
