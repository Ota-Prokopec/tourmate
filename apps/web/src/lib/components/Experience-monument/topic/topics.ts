import IconCastle from '$lib/components/Icons/IconCastle.svelte';
import IconHiking from '$lib/components/Icons/IconHiking.svelte';
import IconMonument from '$lib/components/Icons/IconMonument.svelte';
import IconPaw from '$lib/components/Icons/IconPaw.svelte';
import IconPersonMonument from '$lib/components/Icons/IconPersonMonument.svelte';

export const topics = [
	{
		name: 'hrad/zámky',
		icon: IconCastle,
		key: 'castle'
	},
	{
		name: 'památky',
		icon: IconMonument,
		key: 'monument'
	},
	{
		name: 'person',
		icon: IconPersonMonument,
		key: 'person'
	},
	{
		name: 'animals',
		icon: IconPaw,
		key: 'animals'
	},
	{
		name: 'hiking',
		icon: IconHiking,
		key: 'hiking'
	}
] as const;
