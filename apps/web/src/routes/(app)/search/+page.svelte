<script lang="ts">
	import CategoryPicker from '$lib/components/Common/CategoryPicker.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import { Search } from 'flowbite-svelte';

	const categories = [
		{
			title: 'fotky',
			key: 'experiences'
		},
		{
			title: 'zážitky',
			key: 'monuments'
		}
	];

	const search = async () => {};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center p-4 gap-3">
	<Input class="max-w-100% w-[400px]" icon iconPosition="right" on:iconClick={search}>
		<IconMagnifyingGlass />
	</Input>
	<CategoryPicker {categories} />
</div>
