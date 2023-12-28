<script lang="ts">
	import { user } from '$lib/appwrite/appwrite';
	import { lsStore } from '$lib/utils/lsStore';
	import { locale, setLocale } from '$src/i18n/i18n-svelte';
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
	$: user.addPreferences({ language: selected });

	let className = '';
	export { className as class };
</script>

<Select class={className} items={languageItems} bind:value={selected} />
