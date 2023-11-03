<script lang="ts">
	import lottie from 'lottie-web';
	import { defineElement } from '@lordicon/element';

	export let trigger: 'hover' | 'click' = 'click';
	// define "lord-icon" custom element with default properties
	defineElement(lottie.loadAnimation);
</script>

<lord-icon {trigger} src="/my-icon.json" />
