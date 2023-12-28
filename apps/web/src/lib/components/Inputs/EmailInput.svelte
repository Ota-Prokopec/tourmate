<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import Icon from '../Common/Icon.svelte';
	import Input from '../Common/Input.svelte';
	import IconEnvelope from '../Icons/IconEnvelope.svelte';
	import { twMerge } from 'tailwind-merge';
	export let value: string = '';

	let className = '';
	export { className as class };
</script>

<Input
	icon
	type="email"
	autocomplete="email"
	class={twMerge('w-full !rounded-3xl', className)}
	bind:value
	iconPosition="left"
	floatingLabel={$LL.component.EmailInput.label()}
>
	<Icon class="child:fill-gray-500">
		<IconEnvelope />
	</Icon>
</Input>
