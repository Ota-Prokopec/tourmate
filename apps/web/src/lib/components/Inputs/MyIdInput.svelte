<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import Input from '../Common/Input.svelte';
	export let myId: string;
</script>

<Input
	pattern={/[^a-zA-Z0-9_.-]/}
	maxLength={40}
	class="w-full"
	bind:value={myId}
	icon="@"
	prefix="@"
	invisiblePrefix
	floatingLabel={$LL.component.MyIdInput.label()}
/>
