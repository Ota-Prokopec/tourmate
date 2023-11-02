<script lang="ts">
	import Icon from '$lib/components/Common/Icon.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { Card } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let data: {
		placeName: String;
	};
</script>

<button on:click>
	<Card>
		<Row class="items-center">
			<Icon class="fill-red-500 w-10 h-10">
				<IconLocation class="w-6 h-6" />
			</Icon>
			<Text>{data.placeName}</Text>
		</Row>
	</Card>
</button>
