<script lang="ts">
	export let src: any;
	export let size = '1em';
	export let color = undefined;

	export let className = '';
</script>

<svg
	width={size}
	height={size}
	stroke-width="0"
	class={className}
	{...src.a}
	xmlns="http://www.w3.org/2000/svg">{@html src.c}</svg
>
