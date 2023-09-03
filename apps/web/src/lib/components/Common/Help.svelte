<script lang="ts">
	import { device } from '@app/utils';
	import Icon from './Icon.svelte';
	import Popover from './Popover.svelte';
	import { Tooltip } from 'flowbite-svelte';
	export let placement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';
	export let trigger: 'hover' | 'click' =
		device.recognizeWidth() === 'mobile' ? 'click' : 'hover';
	export let color:
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'default'
		| 'purple'
		| 'pink'
		| 'blue'
		| 'light'
		| 'dark'
		| 'dropdown'
		| 'navbar'
		| 'navbarUl'
		| 'form'
		| 'none' = 'green';
</script>

<Icon class="text-sm text-blue-500" icon="fa fa-question-circle" />
<Popover {trigger} {placement} {color}><slot /></Popover>
