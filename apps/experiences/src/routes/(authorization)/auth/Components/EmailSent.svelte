<script>
	import Icon from '$lib/components/Common/Icon.svelte';
	import Wave from '$lib/components/Common/Wave.svelte';
</script>

<div class="w-full mt-[100px] flex flex-wrap flex-col items-center justify-center p-4">
	<div>Poslali jsme vám na e-mail ověřovací kód.</div>
	<div>Otevřte váš e-mail a rozklikněte adresu, kterou jsme vám poslali.</div>
	<div
		class="mt-5 flex flex-wrap flex-col justify-between items-center w-full max-w-[600px] border-4 border-[#5ea2ff] rounded-2xl"
	>
		<a href="https://www.gmail.com" class="mt-8 text-2xl flex flex-wrap flex-row gap-2"
			>Otevřít G-mail<Icon
				link="https://www.gmail.com"
				class="text-4xl"
				icon="fa fa-envelope"
			/></a
		>
		<Wave color="#5ea2ff" />
		<Wave class="rotate-180" color="#5ea2ff" />

		<a href="https://www.email.cz" class="mb-8 text-2xl flex flex-wrap flex-row gap-2"
			>otevřít Seznam-mail<Icon
				link="https://www.email.cz"
				class="text-4xl"
				icon="fa fa-envelope"
			/></a
		>
	</div>
</div>
