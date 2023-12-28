<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Input from '../Common/Input.svelte';
	import IconEye from '../Icons/IconEye.svelte';
	import Icon from '../Common/Icon.svelte';
	import IconLock from '../Icons/IconLock.svelte';
	import LL from '$src/i18n/i18n-svelte';

	export let value = '';

	let className = '';
	export { className as class };
</script>

<Input
	icon
	class={twMerge('w-full !rounded-3xl', className)}
	bind:value
	type="password"
	iconPosition="left"
	autocomplete="password"
	floatingLabel={$LL.component.PasswordInput.label()}
>
	<Icon class="child:fill-gray-500">
		<IconLock />
	</Icon>
</Input>
