<script lang="ts">
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import TopicItem from '../../topic/TopicItem.svelte';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let monument: MonumentCard;
	export let amIOwner: boolean;
</script>

<Row class="w-full justify-between">
	<LikeSection
		ableToLike={!amIOwner}
		on:like={() => dispatch('like')}
		on:unlike={() => dispatch('unlike')}
		data={{
			liked: monument.liked ? true : false,
			otherUsersThatLiked: monument.likes.map((l) => l.user)
		}}
	/>
	{#if monument.topics}
		<Row class="gap-2">
			{#each monument.topics as topic}
				<TopicItem topicKey={topic} />
			{/each}
		</Row>
	{/if}
</Row>
