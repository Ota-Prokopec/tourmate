<script lang="ts">
	import Card from '$lib/components/Common/Card.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import Share from '$lib/components/Common/Share.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import { navigate } from '$lib/utils/navigator';
	import LL from '$src/i18n/i18n-svelte';
	import type { TTourCard } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';

	export let dismissable = false;

	export let data: TTourCard;

	export let url = `${location.origin}/tour/${data._id}`;

	export let shareData: ShareData = {
		title: $LL.component.TourCardComponent.shareTour.title(),
		url: url
	};

	let className = '';
	export { className as class };
</script>

<Card on:click on:dismiss {dismissable} class={twMerge('gap-2 mobile:w-full ', className)}>
	<Share class="absolute top-0 right-0 m-2" {shareData} />
	<Columns on:click={() => navigate(`/tour/${data._id}`)} columns="1fr 2fr" class="gap-4">
		<CardImage disableFullScreen imgSrc={data.initialTourPicture} />
		<Column>
			<UserItem disableProfileLinkOnClick user={data.creator} />
			<Text>{data.tourName}</Text>
		</Column>
	</Columns>
</Card>
