<script lang="ts">
	import { Avatar, Img } from 'flowbite-svelte';
</script>

<div class="w-full h-min grid justify-center items-start gap-0">
	<Avatar
		rounded
		border
		class="w-32 h-32 justify-self-center rounded-full mt-10 active:scale-[1.5] active:translate-y-5  ease-out duration-300"
		src="/icon.png"
	/>
	<slot />
</div>
