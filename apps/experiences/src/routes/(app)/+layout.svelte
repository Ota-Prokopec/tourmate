<script lang="ts" context="module">
	import IconHome from '$lib/components/Icons/IconHome.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import { Avatar, BottomNav, BottomNavItem } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export const mapOrTakePhoto = writable<'map' | 'takePhoto'>('map');
</script>

<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-full">
	<wrap class="w-full h-auto">
		<slot />
	</wrap>

	<BottomNav position="fixed" navType="application" classInner="grid-cols-3">
		<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="left">
			<IconLocation />
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

		<BottomNavItem on:click={() => goto(`/account/${data.user.myId}`)} appBtnPosition="right">
			<Avatar src={data.user.profilePictureURL} />
		</BottomNavItem>
	</BottomNav>
</div>
