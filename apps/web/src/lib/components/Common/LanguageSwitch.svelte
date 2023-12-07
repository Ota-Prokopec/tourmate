<script lang="ts">
	import { setLocale, locale } from '$src/i18n/i18n-svelte';
	import { Helper, Select } from 'flowbite-svelte';

	const languageItems: [
		{
			name: 'czech';
			value: 'cs';
		},
		{
			name: 'english';
			value: 'en';
		}
	] = [
		{
			name: 'czech',
			value: 'cs'
		},
		{
			name: 'english',
			value: 'en'
		}
	];

	let selected: (typeof languageItems)[number]['value'] = $locale;

	$: setLocale(selected);

	let className = '';
	export { className as class };
</script>

<Select class={className} items={languageItems} bind:value={selected} />
