<script lang="ts">
	import { device } from '@app/utils';
	import { twMerge } from 'tailwind-merge';

	export let size: NonNullable<ReturnType<typeof device.recognizeWidth>>;

	const queries: Record<typeof size, string> = {
		mobile: 'mobile:flex',
		xl: 'xl:flex',
		'2xl': '2xl:flex',
		lg: 'lg:flex',
		md: 'md:flex',
		sm: 'sm:flex'
	};

	let className = '';
	export { className as class };
</script>

<div class={twMerge('hidden', queries[size], className)}>
	<slot />
</div>
