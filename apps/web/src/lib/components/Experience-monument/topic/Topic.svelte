<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import { Topic } from '@app/ts-types';
	import { topics } from './topics';

	export let topic: Topic;

	const icon = topics.filter((t) => t.key === topic)[0]['icon'];
</script>

<Icon>
	<svelte:component this={icon} />
</Icon>
