<script lang="ts">
	import Icon from '../Common/Icon.svelte';
	import IconNext from '../Icons/IconNext.svelte';
</script>

<button
	class="w-[50px] h-[50px] bg-gray-600 justify-center flex items-center rounded-full"
	on:click
>
	<Icon class="child:rotate-90 child:h-6 child:w-6">
		<IconNext />
	</Icon>
</button>
