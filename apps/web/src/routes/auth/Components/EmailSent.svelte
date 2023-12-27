<script lang="ts">
	import Text from '$lib/components/Common/Text.svelte';
	import LL from '$src/i18n/i18n-svelte';
</script>

<div class="w-full mt-[100px] flex flex-wrap flex-col items-center justify-center p-4 text-center">
	<Text>{$LL.component.EmailSent.title()}</Text>
	<Text>{$LL.component.EmailSent.text()}</Text>
</div>
