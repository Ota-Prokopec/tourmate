<script lang="ts">
	import { Avatar, Img } from 'flowbite-svelte';
	import { onMount } from 'svelte';
</script>

<div class="w-full h-full flex flex-wrap flex-col justify-start items-center">
	<Avatar
		rounded
		border
		class="w-32 h-32 rounded-full mt-10 active:scale-[1.5] active:translate-y-5  ease-out duration-300"
		src="/icon.png"
	/>
	<slot />
</div>
