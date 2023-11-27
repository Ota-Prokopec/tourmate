<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import SkeletonLine from '$lib/components/Common/SkeletonLine.svelte';
	import UserInfoSkeleton from '$lib/components/User/UserItemSkeleton.svelte';
	import { twMerge } from 'tailwind-merge';
	import MonumentCardSkeleton from '../monument/MonumentCardSkeleton.svelte';
	import Img from '$lib/components/Common/Img.svelte';
	import ImgSkeleton from '$lib/components/Common/ImgSkeleton.svelte';

	let className = '';
	export { className as class };
</script>

<Card
	class={twMerge(
		'relative justify-self-center gap-0 h-auto w-auto shadow-none border-none p-2 border-0',
		className
	)}
>
	<Column class="relative w-full gap-0">
		<Row class="w-full absolute justify-between p-2">
			<UserInfoSkeleton disableMyId avatarClass="w-10 h-10" class={twMerge('h-auto z-20')} />
		</Row>

		<ImgSkeleton class="w-full h-[400px] z-10" />

		<MonumentCardSkeleton class="mt-[-10px] z-20" size="tiny" />
	</Column>
</Card>
