<script lang="ts">
	import IconConfetti from '../Icons/IconConfetti.svelte';
	import Card from '../Common/Card.svelte';
	import Icon from '../Common/Icon.svelte';
	import Row from '../Common/Row.svelte';

	let className = '';
	export { className as class };
</script>

<Card class={className}>
	<Row class="justify-between top-0 w-full h-14 pr-2 pl-2 pt-2">
		<div class="rotateY">
			<Icon class="child:w-10 child:h-10 h-10 w-10">
				<IconConfetti />
			</Icon>
		</div>
		<Icon class="child:w-10 child:h-10 h-10 w-10">
			<IconConfetti />
		</Icon>
	</Row>

	<div class={'w-full h-[calc(100%-40px)] text-center top-[56px]'}>
		<slot />
	</div>
</Card>

<style>
	.rotateY {
		transform: rotateY(180deg);
	}
</style>
