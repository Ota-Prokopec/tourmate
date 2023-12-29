<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import { Button } from 'flowbite-svelte';
</script>

<Button color="blue" class="w-full p-2" on:click
	>{$LL.component.MoreInformationButton.label()}</Button
>
