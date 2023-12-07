import IconBike from '$lib/components/Icons/IconBike.svelte';
import IconBus from '$lib/components/Icons/IconBus.svelte';
import IconCar from '$lib/components/Icons/IconCar.svelte';
import IconTrain from '$lib/components/Icons/IconTrain.svelte';
import IconWalk from '$lib/components/Icons/IconWalk.svelte';
import type { Transport } from '@app/ts-types';

/**
 * @returns speed is in meters per seconds
 */
export const transports: { name: string; component: any; key: Transport; speed: number }[] = [
	{
		name: 'car',
		component: IconCar,
		key: 'car',
		speed: 16.5
	},
	{
		name: 'bus',
		component: IconBus,
		key: 'bus',
		speed: 16.5
	},
	{
		name: 'bike',
		component: IconBike,
		key: 'bike',
		speed: 4
	},
	{
		name: 'train',
		component: IconTrain,
		key: 'train',
		speed: 13.88
	},
	{
		name: 'walk',
		component: IconWalk,
		key: 'walk',
		speed: 1.3
	}
];
