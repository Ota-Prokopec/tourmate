<script lang="ts">
	import FullPageLoading from '$lib/components/Common/FullPageLoading.svelte';
	import Icon from '$lib/components/Common/Icon.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import IconAt from '$lib/components/Icons/IconAt.svelte';
	import lsStore from '$lib/utils/lsStore';
	import { navigate } from '$lib/utils/navigator';
	import LL from '$src/i18n/i18n-svelte';
	import { Checkbox } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import EmailSent from '../../Components/EmailSent.svelte';
	import LoginViaSocilaMedia from '../../Components/LoginViaSocilaMedia.svelte';
	import type { PageData } from './$types';
	import Column from '$lib/components/Common/Column.svelte';

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
	<Column class="items-center justify-start p-5 mt-4 gap-14">
		<Checkbox bind:checked={termsAccepted}>{$LL.acceptTerms()}</Checkbox>

		<Icon
			on:click={() => navigate(`email`)}
			disabled={!termsAccepted}
			class={twMerge('child:w-10 child:h-10', !termsAccepted && 'fill-gray-400 opacity-[0.8]')}
		>
			<IconAt />
		</Icon>

		<Text>{$LL.or()}</Text>

		<div class="w-full flex flex-wrap flex-col gap-4 relative">
			<LoginViaSocilaMedia disabled={!termsAccepted} on:click={() => (state = 'loading')} />
		</div>
	</Column>
{/if}
