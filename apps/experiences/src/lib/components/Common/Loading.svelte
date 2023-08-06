<script lang="ts">
	let className = 'text-blue-600'
	export { className as class }
</script>

<div class="{className} animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full" role="status" aria-label="loading">
	<span class="sr-only">Loading...</span>
</div>
