<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconLocation from '$lib/components/Icons/IconLocation.svelte';
	import IconMagnifyingGlass from '$lib/components/Icons/IconMagnifyingGlass.svelte';
	import IconMap from '$lib/components/Icons/IconMap.svelte';
	import IconPach from '$lib/components/Icons/IconPach.svelte';
	import IconPlus from '$lib/components/Icons/IconPlus.svelte';
	import { BottomNav, BottomNavItem } from 'flowbite-svelte';
	import RiDeviceScan2Line from 'svelte-icons-pack/ri/RiDeviceScan2Line';
	import { mapOrTakePhoto } from '../+layout.svelte';

	export let userId: string;
	export let profilePictureURL: string | URL;
	export let usersInitials: string;
</script>

<BottomNav
	position="relative"
	classInner="flex flex-wrap flex-row justify-between "
	class=""
	outerClass="mobile:w-full w-[500px] z-50 h-16 dark:bg-black rounded-3xl mobile:rounded-none"
>
	<BottomNavItem on:click={() => goto('/addMonument')} appBtnPosition="left">
		<Icon>
			<IconLocation class="fill-black dark:fill-white" />
		</Icon>
	</BottomNavItem>

	<BottomNavItem on:click={() => goto('/scan')}>
		<Icon>
			<IconPach src={RiDeviceScan2Line} />
		</Icon>
	</BottomNavItem>

	<BottomNavItem on:click={() => goto('/search/places/*')}>
		<Icon>
			<IconMagnifyingGlass />
		</Icon>
	</BottomNavItem>

	<BottomNavItem
		on:click={() => {
			if ($page.url.pathname === '/') {
				goto('/createNewExperience');
			} else {
				goto('/');
			}
		}}
	>
		<Icon>
			{#if $mapOrTakePhoto === 'map' && $page.url.pathname === '/'}
				<IconPlus />
			{:else}
				<IconMap />
			{/if}
		</Icon>
	</BottomNavItem>

	<BottomNavItem on:click={() => goto(`/account/${userId}`)} appBtnPosition="right">
		<Avatar class="w-10 h-10" src={profilePictureURL}>
			{#if !profilePictureURL}
				{usersInitials}
			{/if}
		</Avatar>
	</BottomNavItem>
</BottomNav>
