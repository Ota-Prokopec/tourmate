<script>
	let className = ''
	export { className as class }
</script>

<div class={'text-4xl ' + className}>
	<slot />
</div>
