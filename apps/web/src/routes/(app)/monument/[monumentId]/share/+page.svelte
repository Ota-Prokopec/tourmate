<script lang="ts">
	import Center from '$lib/components/Common/Center.svelte';
	import Column from '$lib/components/Common/Column.svelte';
	import QrCode from '$lib/components/Common/QrCode.svelte';
	import Share from '$lib/components/Common/Share.svelte';
	import MonumentCard from '$lib/components/Experience-monument/Cards/MonumentCard.svelte';
	import CopyInput from '$lib/components/Inputs/CopyInput.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const sharingData: ShareData = {
		text: `Hey, check out this experience!`,
		url: `${location.origin}/monument/${data.monument._id}`
	};

	let url = `${location.origin}/monument/${data.monument._id}}`;
</script>

<Center class="w-full h-full">
	<Column class="justify-center items-center w-full">
		<MonumentCard disableSharing disableSeeMoreButton monument={data.monument} />
		<QrCode class="w-40 h-40" data={url} />
		<Share shareData={sharingData} />
		<CopyInput class="w-[80%] max-w-[600px]" value={url} />
	</Column>
</Center>
