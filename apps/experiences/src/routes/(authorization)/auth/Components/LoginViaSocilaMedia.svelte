<script lang="ts">
	import { user } from '@app/appwrite-client';
	import LoginButtonViaFacebook from './LoginButtonViaFacebook.svelte';
	import LoginButtonViaGoogle from './LoginButtonViaGoogle.svelte';
	let termsAccepted = false;

	const logout = async () => {
		try {
			await user.deleteSessions(); //first things first, i will delete session, if some exists
		} catch (error) {}
	};

	const login = async (platform: string) => {
		await logout();
		await user.createOAuth2Session(
			platform,
			`${location.origin}/auth/oauth2/success`,
			`${location.origin}/oauth2/failure`
		);
	};
</script>

<LoginButtonViaFacebook on:click={() => login('facebook')} />
<LoginButtonViaGoogle on:click={() => login('google')} />
