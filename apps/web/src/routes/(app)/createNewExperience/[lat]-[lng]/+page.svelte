<script lang="ts">
	import { page } from '$app/stores';
	import { navigate } from '$lib/utils/navigator';

	console.log($page);

	navigate('not-chosen');
</script>
