<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import IconTimes from '../Icons/IconTimes.svelte';
	import Full from './Full.svelte';
	import { Button } from 'flowbite-svelte';
	import Row from './Row.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import Text from './Text.svelte';
	import IconCheck from '../Icons/IconCheck.svelte';

	const dispatch = createEventDispatcher<{ close: undefined }>();
</script>

<Full class="bg-white absolute top-0 left-0 z-50">
	<Text class="absolute top-0 left-0 m-2 z-50 text-2xl">{$LL.component.Tutorial.title()}</Text>
	<Button on:click={() => dispatch('close')} color="green" class="absolute top-0 right-0 m-2 z-50">
		<Row class="justify-center items-center gap-2">
			{$LL.component.Tutorial.closeButtonLabel()}
			<Icon class="child:w-5 child:h-5">
				<IconCheck />
			</Icon>
		</Row>
	</Button>

	<iframe
		class="w-full h-full absolute top-0 left-0"
		title="Tourmate"
		src="https://scribehow.com/embed/TourMatecz__gNz9foUvQuWLEtSQSBuWBA?as=scrollable&skipIntro=true"
		allowfullscreen
		frameborder="0"
	/>
</Full>
