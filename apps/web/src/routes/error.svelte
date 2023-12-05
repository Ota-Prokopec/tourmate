<script>
	import Column from '$lib/components/Common/Column.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { Avatar, Button } from 'flowbite-svelte';
</script>

<Column class="w-full justify-start items-center gap-28">
	<Avatar
		rounded
		border
		class="w-32 h-32 top-0 justify-self-center rounded-full mt-10 active:scale-[1.5] active:translate-y-5  ease-out duration-300"
		src="/icon.png"
	/>
	<Column class="w-full items-center justify-center  gap-4">
		<Text class="text-red-500 text-3xl">
			{$LL.errorMessage()}
		</Text>
		<Button on:click={() => location.reload()} color="green">{$LL.tryItAgain()}</Button>
	</Column>
</Column>
