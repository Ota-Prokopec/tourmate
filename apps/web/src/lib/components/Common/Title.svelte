<script>
	let className = '';
	export { className as class };
</script>

<div class={'text-4xl text-center ' + className}>
	<slot />
</div>
