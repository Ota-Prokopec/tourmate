<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';
</script>

<DarkMode size="sm">
	<svelte:fragment slot="lightIcon">
		<SunSolid />
	</svelte:fragment>
	<svelte:fragment slot="darkIcon">
		<MoonSolid />
	</svelte:fragment>
</DarkMode>
