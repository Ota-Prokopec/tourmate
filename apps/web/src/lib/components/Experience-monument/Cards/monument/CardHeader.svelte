<script lang="ts">
	import ChooseFromIconsItem from '$lib/components/ChooseFromIcons/ChooseFromIconsItem.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { topics } from '../../topic/topics';
	import { at } from 'lodash';
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
				<ChooseFromIconsItem>
					<svelte:component this={topics.filter((t) => t.key === topic)[0].component} />
				</ChooseFromIconsItem>
			{/each}
		</Row>
	{/if}
</Row>
