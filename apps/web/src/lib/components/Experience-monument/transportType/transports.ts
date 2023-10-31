import IconBike from '$lib/components/Icons/IconBike.svelte';
import IconBus from '$lib/components/Icons/IconBus.svelte';
import IconCar from '$lib/components/Icons/IconCar.svelte';
import IconTrain from '$lib/components/Icons/IconTrain.svelte';
import IconWalk from '$lib/components/Icons/IconWalk.svelte';
import type { Transport } from '@app/ts-types';

export const transports: { name: string; component: any; key: Transport }[] = [
	{
		name: 'car',
		component: IconCar,
		key: 'car'
	},
	{
		name: 'bus',
		component: IconBus,
		key: 'bus'
	},
	{
		name: 'bike',
		component: IconBike,
		key: 'bike'
	},
	{
		name: 'train',
		component: IconTrain,
		key: 'train'
	},
	{
		name: 'walk',
		component: IconWalk,
		key: 'walk'
	}
];
