<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';

	let className = '';
	export { className as class };
</script>

<DarkMode class={className} size="sm">
	<svelte:fragment slot="lightIcon">
		<SunSolid />
	</svelte:fragment>
	<svelte:fragment slot="darkIcon">
		<MoonSolid />
	</svelte:fragment>
</DarkMode>
