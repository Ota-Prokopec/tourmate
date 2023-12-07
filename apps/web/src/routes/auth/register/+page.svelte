<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Common/Button.svelte';
	import ErrorHelpler from '$lib/components/Common/ErrorHelper.svelte';
	import Help from '$lib/components/Common/Help.svelte';
	import Input from '$lib/components/Common/Input.svelte';
	import IconNext from '$lib/components/Icons/IconNext.svelte';
	import { collections, Queries } from '$lib/appwrite/appwrite';
	import Text from '$lib/components/Common/Text.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import ButtonNext from '$lib/components/Buttons/ButtonNext.svelte';
	import LL from '$src/i18n/i18n-svelte';
	import Right from '$lib/components/Common/Right.svelte';
	import Center from '$lib/components/Common/Center.svelte';

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

<Column class="w-full items-center max-w-[400px]">
	<Text class="text-xl">{$LL.regitrationPageTitle()}</Text>

	<Right>
		<Help placement="left">{$LL.registrationPageUsernameUserIdConditions()}</Help>
	</Right>
	<ErrorHelpler bind:message={error} timeout={2000} />
	<Input class="w-full " bind:value={username} floatingLabel="uživatelské jméno" />
	<Input
		pattern={/[^a-zA-Z0-9_-]/}
		maxLength={40}
		class="w-full "
		bind:value={myId}
		icon="@"
		prefix="@"
		floatingLabel="uživatelské ID"
	/>
</Column>

<Right class="fixed bottom-0 p-10">
	<ButtonNext disabled={!(myId.length >= 5 && username.length >= 4)} on:click={redirect} />
</Right>
