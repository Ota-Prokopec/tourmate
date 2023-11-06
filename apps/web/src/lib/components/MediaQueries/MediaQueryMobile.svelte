<script lang="ts">
	import { device } from '@app/utils';
</script>

{#if device.recognizeWidth() === 'mobile'}
	<slot />
{/if}
