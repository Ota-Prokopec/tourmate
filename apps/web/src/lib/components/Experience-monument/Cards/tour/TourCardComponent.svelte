<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Card from '$lib/components/Common/Card.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import type { Base64, TTourCard, UserInfo } from '@app/ts-types';
	import { Button } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CardImage from '../CardImage.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import UserItem from '$lib/components/User/UserItem.svelte';
	import Rows from '$lib/components/Common/Rows.svelte';
	import Columns from '$lib/components/Common/Columns.svelte';
	import { navigate } from '$lib/utils/navigator';

	export let dismissable = false;

	export let data: TTourCard;

	let className = '';
	export { className as class };
</script>

<Card
	on:click
	on:click={() => navigate(`/tour/${data._id}`)}
	on:dismiss
	{dismissable}
	class={twMerge('gap-2 mobile:w-full ', className)}
>
	<Columns columns="1fr 2fr" class="gap-4">
		<CardImage disableFullScreen imgSrc={data.initialTourPicture} />
		<Column>
			<UserItem disableProfileLinkOnClick user={data.creator} />
			<Text>{data.tourName}</Text>
		</Column>
	</Columns>
</Card>
