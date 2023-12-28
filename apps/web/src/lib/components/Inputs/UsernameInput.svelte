<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import Input from '../Common/Input.svelte';

	export let value = '';
</script>

<Input class="w-full" bind:value floatingLabel={$LL.component.UsernameInput.label()} />
