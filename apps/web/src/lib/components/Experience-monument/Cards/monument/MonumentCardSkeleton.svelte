<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Left from '$lib/components/Common/Left.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import SkeletonLine from '$lib/components/Common/SkeletonLine.svelte';
	import IconShare from '$lib/components/Icons/IconShare.svelte';
	import UserItemSkeleton from '$lib/components/User/UserItemSkeleton.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { Button, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import OwnerOptions from '../OwnerOptions.svelte';
	import ImgSkeleton from '$lib/components/Common/ImgSkeleton.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';

	export let size: 'tiny' | 'small' | 'normal';

	export let disableSeeMoreButton = false;
	export let disableSharing = false;

	let className = '';
	export { className as class };
</script>

<Card class={twMerge('relative justify-self-center gap-2 p-2', className)}>
	{#if size !== 'tiny'}
		<Row class="justify-between">
			<UserItemSkeleton avatarClass="w-10 h-10" class="h-auto" />

			<Column class="gap-0 flex justify-center items-center">
				<OwnerOptions type="monument" />
				{#if !disableSharing}
					<Icon class="mb-2">
						<IconShare class="w-5 h-5" />
					</Icon>
				{/if}
			</Column>
		</Row>
	{/if}

	<svelte:component this={size === 'tiny' || size === 'small' ? Columns : Column} columns="1fr 1fr">
		<ImgSkeleton class="w-full h-full" />
		{#if size !== 'tiny'}
			<Left class="pl-4">
				<SkeletonLine class="w-[5rem]" />
			</Left>
		{/if}

		<Row class="justify-between gap-2">
			<SkeletonLine class="w-[10rem]" />

			<Row class="gap-1">
				<Icon class="text-xl ">
					<IconLocation />
				</Icon>
				<SkeletonLine class="w-[10rem] h-[3rem] rounded-md" />
			</Row>
		</Row>
	</svelte:component>

	{#if size !== 'tiny'}
		<Row class="w-full justify-between">
			<Row class="w-full justify-between">
				<SkeletonLine class="w-[150px]" />

				<Column class="gap-1">
					<SkeletonLine class="rounded-full" />
					<SkeletonLine class="rounded-full" />
				</Column>
			</Row>
		</Row>
	{/if}

	<div class="w-full h-auto flex justify-start">
		<slot />
	</div>

	{#if size !== 'tiny'}
		<Column class="gap-2 mt-2">
			<Right>
				<Button color="green">{$LL.seeOnGoogleMaps()}</Button>
			</Right>
			{#if !disableSeeMoreButton}
				<Button color="blue" class=" w-full p-2">{$LL.seeMore()}</Button>
			{/if}
		</Column>
	{/if}
	<div class="w-full h-auto mt-2">
		<slot name="bottom" />
	</div>
</Card>
