<script lang="ts">
	import MonumentCardComponent from '$lib/components/Experience-monument/Cards/monument/MonumentCardComponent.svelte';
	import type { MonumentCard } from '@app/ts-types';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import SplideType from '@splidejs/splide';

	import '@splidejs/svelte-splide/css';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Column from '$lib/components/Common/Column.svelte';

	export let monuments: MonumentCard[] = [];
</script>

<Column>
	{#each monuments as monument}
		<MonumentCardComponent {monument} size="normal" />
	{/each}
</Column>
