<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';

	export let checked = false;
</script>

<Checkbox
	class="font-normal p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
	custom
	bind:checked
>
	<slot />
</Checkbox>
