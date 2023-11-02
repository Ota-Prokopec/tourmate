import IconCastle from '$lib/components/Icons/IconCastle.svelte';
import IconHiking from '$lib/components/Icons/IconHiking.svelte';
import IconMonument from '$lib/components/Icons/IconMonument.svelte';
import IconPaw from '$lib/components/Icons/IconPaw.svelte';
import IconPersonMonument from '$lib/components/Icons/IconPersonMonument.svelte';
import { type Topic } from '@app/ts-types';

export const topics: {
	name: string;
	component: any;
	key: Topic;
}[] = [
	{
		name: 'hrad/zámky',
		component: IconCastle,
		key: 'castle'
	},
	{
		name: 'památky',
		component: IconMonument,
		key: 'monument'
	},
	{
		name: 'person',
		component: IconPersonMonument,
		key: 'person'
	},
	{
		name: 'animals',
		component: IconPaw,
		key: 'animals'
	},
	{
		name: 'hiking',
		component: IconHiking,
		key: 'hiking'
	}
];
