<script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full h-auto flex justify-center">
	<div class="max-w-[400px] w-full">
		<FloatingLabelInput class="max-w-[200px]" type="text" label="username" />
	</div>
</div>
