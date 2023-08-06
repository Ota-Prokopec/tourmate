<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';
	export let accepted: boolean;
</script>

<div class="w-96 grid grid-cols-[min-content_auto] gap-2 items-center">
	<Checkbox bind:checked={accepted} />
	<div class="flex flex-wrap flex-row gap-1">
		<span
			>Souhlasím s pravidly a podmínky o používání této aplikace. Kliknutím <a
				href="/aboutus/terms">zde</a
			> si přečtěte naše pravidla a podmínky
		</span>
	</div>
</div>
