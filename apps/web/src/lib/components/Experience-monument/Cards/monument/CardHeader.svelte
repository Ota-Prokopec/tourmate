<script lang="ts">
	import ChooseFromIconsItem from '$lib/components/ChooseFromIcons/ChooseFromIconsItem.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { topics } from '../../topic/topics';
	import { at } from 'lodash';
	import { transports } from '../../transportType/transports';
	import Column from '$lib/components/Common/Column.svelte';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let monument: MonumentCard;
	export let amIOwner: boolean;
</script>

<Row class="w-full justify-between m-2">
	<LikeSection
		ableToLike={!amIOwner}
		on:like={() => dispatch('like')}
		on:unlike={() => dispatch('unlike')}
		data={{
			liked: monument.liked ? true : false,
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
			{#each monument.transports as transport}
				<ChooseFromIconsItem circuit={false}>
					<svelte:component this={transports.filter((t) => t.key === transport)[0].component} />
				</ChooseFromIconsItem>
			{/each}
		</Row>
	</Column>
</Row>
