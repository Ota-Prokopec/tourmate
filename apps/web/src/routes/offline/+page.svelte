<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Center from '$lib/components/Common/Center.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconNoWifi from '$lib/components/Icons/IconNoWifi.svelte';
	import { P, Heading } from 'flowbite-svelte';
	import { alert } from '../alertStore';

	alert(
		'No internet connection',
		'Your internet connection is not working, please try to connect to internet and try Tourmate again.',
		{ color: 'red' }
	);
</script>

<Center class="flex flex-wrap flex-col gap-16 justify-center items-center h-full w-full p-2">
	<Heading tag="h1" class="font-bold w-auto h-auto">Offline</Heading>
	<Icon class="child:w-16 child:h-16">
		<IconNoWifi />
	</Icon>
</Center>
