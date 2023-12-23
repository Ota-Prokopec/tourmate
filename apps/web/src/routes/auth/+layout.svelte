<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import { Avatar, Img } from 'flowbite-svelte';
</script>

<Column class="justify-start w-full items-center gap-0 h-auto overflow-auto">
	<Avatar
		rounded
		border
		class="w-32 h-32 justify-self-center rounded-full mt-10 mb-2 active:scale-[1.5] active:translate-y-5  ease-out duration-300"
		src="/icon.png"
	/>
	<slot />
</Column>
