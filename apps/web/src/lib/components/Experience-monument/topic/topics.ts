import IconCastle from '$lib/components/Icons/IconCastle.svelte';
import IconHiking from '$lib/components/Icons/IconHiking.svelte';
import IconMonument from '$lib/components/Icons/IconMonument.svelte';
import IconPaw from '$lib/components/Icons/IconPaw.svelte';
import IconPersonMonument from '$lib/components/Icons/IconPersonMonument.svelte';
import LL from '$src/i18n/i18n-svelte';
import { type Topic } from '@app/ts-types';
import { get } from 'svelte/store';

const translates = get(LL).common.topic;

export const topics: {
	name: string;
	component: any;
	key: Topic;
}[] = [
	{
		name: translates.castle(),
		component: IconCastle,
		key: 'castle'
	},
	{
		name: translates.monument(),
		component: IconMonument,
		key: 'monument'
	},
	{
		name: translates.person(),
		component: IconPersonMonument,
		key: 'person'
	},
	{
		name: 'zoo',
		component: IconPaw,
		key: 'animals'
	},
	{
		name: translates.hiking(),
		component: IconHiking,
		key: 'hiking'
	}
];
