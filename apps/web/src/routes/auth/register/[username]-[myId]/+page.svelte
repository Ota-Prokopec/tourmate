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
	import Link from '$lib/components/Common/Link.svelte';

	export let data: PageData;

	let state: 'loading' | 'email-sent' | null = null;
	let termsAccepted = false;
</script>

{#if state === 'email-sent'}
	<EmailSent />
{:else if state === 'loading'}
	<FullPageLoading />
{:else}
	<Column class="items-center justify-start p-5 mt-4 gap-14">
		<Checkbox bind:checked={termsAccepted}>
			<Link href={`/auth/terms`}>{$LL.page.signUp.acceptTerms()}</Link></Checkbox
		>

		<Icon
			on:click={() => navigate(`email`)}
			disabled={!termsAccepted}
			class={twMerge('child:w-10 child:h-10', !termsAccepted && 'fill-gray-400 opacity-[0.8]')}
		>
			<IconAt />
		</Icon>

		<Text>{$LL.common.or()}</Text>

		<div class="w-full flex flex-wrap flex-col gap-4 relative">
			<LoginViaSocilaMedia
				userData={data.params}
				disabled={!termsAccepted}
				on:click={() => (state = 'loading')}
			/>
		</div>
	</Column>
{/if}
