<script lang="ts">
	import { colors } from '@app/utils';
	import { twMerge } from 'tailwind-merge';

	let input: undefined | HTMLInputElement;

	export let value: number;
	export let max: number;
	export let min: number;

	let className = '';
	export { className as class };
</script>

<input bind:this={input} type="range" class={twMerge('', className)} {min} {max} bind:value />

<style>
	input[type='range'] {
		-webkit-appearance: none;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		cursor: pointer;
		box-shadow: 0px 0px 1px #000000;
		background: #ffffff;
		border-radius: 27px;
		border: 2px solid #ffffff;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0px 0px 10px #1492ff;
		border: 1px solid #1492ff;
		border-radius: 50px;
		background: #1492ff;
		cursor: pointer;
		-webkit-appearance: none;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #ffffff;
	}
	input[type='range']::-moz-range-track {
		cursor: pointer;
		box-shadow: 0px 0px 1px #000000;
		background: #ffffff;
		border-radius: 27px;
		border: 2px solid #ffffff;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0px 0px 10px #1492ff;
		border: 1px solid #1492ff;

		border-radius: 50px;
		background: #1492ff;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #ffffff;
		border: 2px solid #ffffff;
		border-radius: 54px;
		box-shadow: 0px 0px 1px #000000;
	}
	input[type='range']::-ms-fill-upper {
		background: #ffffff;
		border: 2px solid #ffffff;
		border-radius: 54px;
		box-shadow: 0px 0px 1px #000000;
	}
	input[type='range']::-ms-thumb {
		box-shadow: 0px 0px 10px #1492ff;
		border: 1px solid #1492ff;

		border-radius: 50px;
		background: #1492ff;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #ffffff;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #ffffff;
	}
</style>
