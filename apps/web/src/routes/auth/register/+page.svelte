<script lang="ts">
	import { goto } from '$app/navigation';
	import { collections, Queries } from '$lib/appwrite/appwrite';
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import Help from '$lib/components/Common/Help.svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import MyIdInput from '$lib/components/Inputs/MyIdInput.svelte';
	import UsernameInput from '$lib/components/Inputs/UsernameInput.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import { alert } from '$src/routes/alertStore';

	let username = '';
	let myId = '';

	const redirect = async () => {
		try {
			const quiziIdTaken = (
				await collections.userInfo.listDocuments([Queries.userInfo.equal('myId', myId)])
			).total;

			if (quiziIdTaken) throw new Error('user with myId already exists');

			goto(`/auth/register/${username}-${myId}`);
		} catch (err) {
			alert('', $LL.page.signUp.userAlreadyExists(), { color: 'red' });
		}
	};
</script>

<Column class="w-full items-center max-w-[400px]">
	<Text class="text-xl text-center">{$LL.page.signUp.title()}</Text>

	<Right>
		<Help class="w-[80%] max-w-[400px]" placement="left"
			>{$LL.page.signUp.usernameUserIdConditions()}</Help
		>
	</Right>

	<UsernameInput bind:value={username} />
	<MyIdInput bind:myId />
</Column>

<Right class="fixed bottom-0 p-10">
	<ButtonNext disabled={!(myId.length >= 5 && username.length >= 4)} on:click={redirect} />
</Right>
