<script lang="ts">
	import ChooseFromIconsItem from '$lib/components/ChooseFromIcons/ChooseFromIconsItem.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import LikeSection from '$lib/components/LikeSection/LikeSection.svelte';
	import Popover from '$lib/components/Common/Popover.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import TypeWriter from '$lib/components/Common/TypeWriter.svelte';
	import IconQuestion from '$lib/components/Icons/IconQuestion.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { Location, MonumentCard } from '@app/ts-types';
	import { getTimeFromAToB, normalizeTime } from '@app/utils';
	import { createEventDispatcher } from 'svelte';
	import { topics } from '../../topic/topics';
	import { transports } from '../../transportType/transports';
	import type { LikeSectionState } from '$lib/components/LikeSection/LikeSectionState';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let monument: MonumentCard;
	export let liked: LikeSectionState;
	export let amIOwner: boolean;
	export let usersLocation: Location | undefined;
</script>

<Row class="w-full justify-between">
	<LikeSection
		ableToLike={!amIOwner}
		on:like={() => dispatch('like')}
		on:unlike={() => dispatch('unlike')}
		data={{
			liked: liked,
			otherUsersThatLiked: monument.likes.map((l) => l.user)
		}}
	/>
	<Column class="gap-1 items-end p-2">
		<Row>
			{#each monument.topics as topic}
				<ChooseFromIconsItem circuit={false}>
					{@const component = topics.filter((t) => t.key === topic)[0]?.component}
					<svelte:component this={component} />
				</ChooseFromIconsItem>
			{/each}
		</Row>
		<Row>
			{#each monument.transports as transportKey}
				{@const transport = transports.filter((t) => t.key === transportKey)[0]}
				{#if transport}
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
									{normalizeTime(seconds, $LL.common.and())}
								</TypeWriter>
							</Popover>
						{/if}
					{/if}
				{/if}
			{/each}
		</Row>
		{#if monument.question}
			<ChooseFromIconsItem circuit={false}>
				<IconQuestion />
			</ChooseFromIconsItem>
			<Popover placement="right" class="w-[200px]" color="blue">
				<Text>
					{monument.question.question}
				</Text>
			</Popover>
		{/if}
	</Column>
</Row>
