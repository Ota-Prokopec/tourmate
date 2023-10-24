<script lang="ts">
	import Circle from './Circle.svelte';
</script>

<Circle class="h-14 w-14 bg-white animate-pulse relative ">
	<Circle
		class="h-14 w-14 animate-[scale_1s_infinite] absolute bg-transparent border-4 border-white flex justify-center items-center delay-300"
	>
		<Circle
			class="h-14 w-14 animate-scale absolute bg-transparent border-2 border-white flex justify-center items-center"
		/>
	</Circle>
</Circle>
