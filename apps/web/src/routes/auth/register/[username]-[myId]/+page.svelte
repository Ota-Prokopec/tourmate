<script lang="ts">
	import Title from '$lib/components/Common/Title.svelte';
	import EmailInput from '$lib/components/Inputs/EmailInput.svelte';
	import PasswordInput from '$lib/components/Inputs/PasswordInput.svelte';
	import appwrite, { user } from '$lib/appwrite/appwrite';
	import lsStore from '$lib/utils/lsStore';
	import LoginViaSocilaMedia from '../../Components/LoginViaSocilaMedia.svelte';
	import type { PageData } from './$types';
	import { sdk } from '$src/graphql/sdk';
	import ErrorHelpler from '$lib/components/Common/ErrorHelper.svelte';
	import Button from '$lib/components/Common/Button.svelte';
	import { Checkbox, Toggle } from 'flowbite-svelte';
	import { ApolloError } from '@apollo/client';
	import { SyncLoader } from 'svelte-loading-spinners';
	import Loading from '$lib/components/Common/Loading.svelte';
	import EmailSent from '../../Components/EmailSent.svelte';
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import { AppwriteException } from 'appwrite';
	import LL from '$src/i18n/i18n-svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import IconAt from '$lib/components/Icons/IconAt.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { twMerge } from 'tailwind-merge';
	import { goto } from '$app/navigation';
	import { navigate } from '$lib/utils/navigator';

	export let data: PageData;

	let state: 'loading' | 'email-sent' | null = null;
	let error = '';
	let termsAccepted = false;

	//set username and myid into localstorage for being able to access this data when user registers via socila media
	$lsStore.user = {
		...data.params
	};
</script>

{#if state === 'email-sent'}
	<EmailSent />
{:else if state === 'loading'}
	<FullPageLoading />
{:else}
	<div class="w-full h-auto flex flex-wrap flex-col items-center justify-start p-5 mt-4 gap-14">
		<Checkbox bind:checked={termsAccepted}>{$LL.acceptTerms()}</Checkbox>

		<Icon
			on:click={() => navigate(`email`)}
			disabled={!termsAccepted}
			class={twMerge('child:w-10 child:h-10', !termsAccepted && 'fill-gray-400 opacity-[0.8')}
		>
			<IconAt />
		</Icon>

		<Text>{$LL.or()}</Text>

		<div class="w-full flex flex-wrap flex-col gap-4 relative">
			<LoginViaSocilaMedia disabled={!termsAccepted} on:click={() => (state = 'loading')} />
		</div>
	</div>
{/if}
