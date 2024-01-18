<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import InstallApp from '$lib/components/Common/InstallApp.svelte';
	import Left from '$lib/components/Common/Left.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { Avatar } from 'flowbite-svelte';
</script>

<InstallApp />

<Column class="justify-start w-full items-center gap-0 h-auto overflow-auto p-2">
	<Left><Text tag="h1" class="text-3xl m-4 font-bold">tourmate</Text></Left>

	<Avatar
		rounded
		border
		class="w-32 h-32 justify-self-center rounded-full mt-10 mb-2 active:scale-[1.5] active:translate-y-5  ease-out duration-300"
		src="/icon.png"
	/>

	<slot />
</Column>
