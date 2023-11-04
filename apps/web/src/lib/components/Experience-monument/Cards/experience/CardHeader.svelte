<script lang="ts">
	import ChooseFromIconsItem from '$lib/components/ChooseFromIcons/ChooseFromIconsItem.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import type { ExperienceCard, MonumentCard } from '@app/ts-types';
	import { createEventDispatcher } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher<{ like: undefined; unlike: undefined }>();

	export let experience: ExperienceCard;
	export let liked: boolean | 'pending';
	export let amIOwner: boolean;

	let className = '';
	export { className as class };
</script>

<Row class={twMerge('w-full justify-between', className)}>
	<LikeSection
		ableToLike={!amIOwner}
		on:like={() => dispatch('like')}
		on:unlike={() => dispatch('unlike')}
		data={{
			liked: liked ? true : false,
			otherUsersThatLiked: experience.likes.map((l) => l.user)
		}}
	/>
</Row>
