<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	import { user } from '$lib/appwrite/appwrite';
	export let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';

	const toggleTheme = () => {
		const isDark = window.document.documentElement.classList.toggle('dark');
		user.addPreferences({ colorTheme: isDark ? 'light' : 'dark' });
	};

	let className = '';
	export { className as class };
</script>

<button on:click={toggleTheme} type="button" {...$$restProps} class={twMerge(btnClass, className)}>
	<span class="hidden dark:block">
		<slot name="lightIcon">
			<SunSolid />
		</slot>
	</span>
	<span class="block dark:hidden">
		<slot name="darkIcon">
			<MoonSolid />
		</slot>
	</span>
</button>
