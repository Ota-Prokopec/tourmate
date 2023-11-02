<script lang="ts">
	import { user } from '$lib/appwrite/appwrite';
	import IconFacebook from '$lib/components/Icons/IconFacebook.svelte';
	import IconGoogle from '$lib/components/Icons/IconGoogle.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconDiscord from '$lib/components/Icons/IconDiscord.svelte';
	import IconGithub from '$lib/components/Icons/IconGithub.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SocialPlatform } from '@app/ts-types';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher<{ click: undefined }>();

	export let disabled: boolean = false;

	const logout = async () => {
		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}
	};

	const login = async (platform: SocialPlatform) => {
		await logout();
		await user.createOAuth2Session(
			platform,
			`${location.origin}/auth/oauth2/success`,
			`${location.origin}/oauth2/failure`
		);
	};

	const blurryClass = 'opacity-[0.7]  ';
</script>

<button class="w-auto flex flex-wrap flex-row gap-10 items-center justify-center">
	<Icon
		on:click={() => dispatch('click')}
		{disabled}
		class={twMerge('w-14', disabled && blurryClass)}
		on:click={() => login('facebook')}
	>
		<IconFacebook />
	</Icon>
	<Icon
		on:click={() => dispatch('click')}
		{disabled}
		class={twMerge('w-14', disabled && blurryClass)}
		on:click={() => login('google')}
	>
		<IconGoogle />
	</Icon>
	<Icon
		on:click={() => dispatch('click')}
		{disabled}
		class={twMerge('w-14', disabled && blurryClass)}
		on:click={() => login('discord')}
	>
		<IconDiscord />
	</Icon>
	<Icon
		on:click={() => dispatch('click')}
		{disabled}
		class={twMerge('w-14', disabled && blurryClass)}
		on:click={() => login('github')}
	>
		<IconGithub />
	</Icon>
</button>
