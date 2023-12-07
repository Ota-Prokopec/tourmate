<script lang="ts">
	import { setLocale, locale } from '$src/i18n/i18n-svelte';
	import { Select } from 'flowbite-svelte';

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
</script>

<Select class="mt-2" items={languageItems} bind:value={selected} />
