<script lang="ts" context="module">
	import IconEnvelope from '$lib/components/Icons/IconEnvelope.svelte';
	import IconHome from '$lib/components/Icons/IconHome.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import IconSettings from '$lib/components/Icons/IconSettings.svelte';
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import { myNewExperienceStore } from './createNewExperience/newExperienceStore';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');
</script>

<div class="w-full h-full">
	<wrap class="w-full h-auto">
		<slot />
	</wrap>

	<BottomNav position="fixed" navType="application" classInner="grid-cols-3">
		<BottomNavItem appBtnPosition="left">
			<IconEnvelope />
		</BottomNavItem>
		<BottomNavItem
			on:click={() => {
				if ($mapOrTakePhoto === 'map' && $page.url.pathname === '/') {
					$mapOrTakePhoto = 'takePhoto';
				} else {
					$mapOrTakePhoto = 'map';
				}
				goto('/');
			}}
			appBtnPosition="middle"
		>
			{#if $mapOrTakePhoto === 'map' && $page.url.pathname === '/'}
				<IconPlus />
			{:else}
				<IconHome />
			{/if}
		</BottomNavItem>

		<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="right">
			<IconLocation />
		</BottomNavItem>
	</BottomNav>
</div>
