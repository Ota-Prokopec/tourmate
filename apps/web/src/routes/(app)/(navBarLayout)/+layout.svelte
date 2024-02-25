<script lang="ts">
	import Bar from './Components/Bar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const usernameSplited = data.user.username.split(' ');

	const usersInitials = `${usernameSplited[0]?.at(0)} ${
		usernameSplited.length >= 2 && usernameSplited[1]?.at(0)
	}`;
</script>

<div class="w-full h-full flex flex-wrap flex-col items-center justify-center">
	<div class="w-full h-[calc(100%-64px)] top-0 absolute overflow-scroll">
		<slot />
	</div>

	<div class="w-full h-auto fixed bottom-0 flex justify-center z-50">
		<Bar userId={data.user.myId} profilePictureURL={data.user.profilePictureURL} {usersInitials} />
	</div>
</div>
