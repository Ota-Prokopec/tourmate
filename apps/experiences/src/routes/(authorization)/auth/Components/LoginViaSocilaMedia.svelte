<script lang="ts">
	import { user } from '@app/appwrite-client';
	import IconFacebook from '$lib/components/Icons/IconFacebook.svelte';
	import IconGoogle from '$lib/components/Icons/IconGoogle.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconDiscord from '$lib/components/Icons/IconDiscord.svelte';
	import IconGithub from '$lib/components/Icons/IconGithub.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SocialPlatform } from '@app/ts-types';
	const dispatch = createEventDispatcher<{ beforeLogin: SocialPlatform }>();

	const logout = async () => {
		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}
	};

	const login = async (platform: SocialPlatform) => {
		await logout();
		dispatch('beforeLogin', platform);
		await user.createOAuth2Session(
			platform,
			`${location.origin}/auth/oauth2/success`,
			`${location.origin}/oauth2/failure`
		);
	};
</script>

<div class="w-auto flex flex-wrap flex-row gap-10 items-center justify-center">
	<Icon class="w-14" on:click={() => login('facebook')}>
		<IconFacebook />
	</Icon>
	<Icon class="w-14" on:click={() => login('google')}>
		<IconGoogle />
	</Icon>
	<Icon class="w-14" on:click={() => login('discord')}>
		<IconDiscord />
	</Icon>
	<Icon class="w-14" on:click={() => login('github')}>
		<IconGithub />
	</Icon>
</div>
