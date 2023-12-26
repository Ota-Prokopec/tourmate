<script lang="ts">
	import Circle from './Circle.svelte';
</script>

<button class="relative flex justify-center items-center">
	<Circle class="h-14 w-14 bg-gray-500 dark:bg-white animate-pulse relative ">
		<Circle
			class="h-14 w-14 animate-[scale_1s_infinite] absolute bg-transparent border-4 border-black dark:border-white flex justify-center items-center delay-300"
		>
			<Circle
				class="h-14 w-14 animate-scale absolute bg-transparent border-2 border-black dark:border-white flex justify-center items-center"
			/>
		</Circle>
	</Circle>
	<span class="absolute"><slot /></span>
</button>
