<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconNoWifi from '$lib/components/Icons/IconNoWifi.svelte';
	import { Heading } from 'flowbite-svelte';
</script>

<Center class="flex flex-wrap flex-col gap-16 justify-center items-center h-full w-full p-2">
	<Heading tag="h1" class="font-bold w-auto h-auto">
		<Text>Offline</Text>
	</Heading>
	<Icon class="child:w-16 child:h-16">
		<IconNoWifi />
	</Icon>
</Center>
