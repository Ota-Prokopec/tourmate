<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Common/Button.svelte';
	import ErrorHelpler from '$lib/components/Common/ErrorHelper.svelte';
	import Help from '$lib/components/Common/Help.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { collections, Queries } from '$lib/appwrite/appwrite';

	let username = '';
	let myId = '';
	let error = '';

	const redirect = async () => {
		try {
			const quiziIdTaken = (
				await collections.userInfo.listDocuments([Queries.userInfo.equal('myId', myId)])
			).total;

			if (quiziIdTaken) throw new Error('user with myId already exists');

			goto(`/auth/register/${username}-${myId}`);
		} catch (err) {
			error = 'user with myId already exists';
			console.log('error');
		}
	};
</script>

<div class="w-full h-auto flex flex-wrap flex-col items-center justify-start p-5 gap-10 mt-4">
	<div>
		<p>Welcome into experinece app, we are happy to see you here.</p>
		<p>Begin with registration</p>
	</div>

	<div class="flex w-full max-w-[400px] pl-2 pr-2 flex-wrap flex-col gap-5 h-auto">
		<div class="w-full flex justify-end">
			<Help placement="left">Please username and user id has contain at least 4 letters</Help>
		</div>
		<ErrorHelpler bind:message={error} timeout={2000} />
		<Input class="w-full" icon bind:value={username} floatingLabel="uživatelské jméno" />
		<Input
			pattern={/[^a-zA-Z0-9]/}
			maxLength={40}
			bind:value={myId}
			icon="@"
			prefix="@"
			floatingLabel="uživatelské ID"
		/>
	</div>

	<div class="w-full h-auto flex justify-end fixed bottom-0 p-10">
		<Button
			disabled={!(myId.length >= 5 && username.length >= 4)}
			on:click={redirect}
			class="bg-blue-500 flex flex-wrap flex-row gap-2 "
		>
			další
			<IconNext class="w-8 h-8 fill-white" />
		</Button>
	</div>
</div>
