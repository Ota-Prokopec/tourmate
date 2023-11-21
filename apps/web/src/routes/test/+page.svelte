<script>
	import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte';
	import { InfoCircleSolid, UserPlusSolid, CalendarEditSolid } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';

	let hidden4 = false;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<div class="text-center">
	<Button on:click={() => (hidden4 = false)}>Show drawer form</Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id="sidebar4">
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
		>
			<InfoCircleSolid class="w-4 h-4 mr-2.5" />New event
		</h5>
		<CloseButton on:click={() => (hidden4 = true)} class="mb-4 dark:text-white" />
	</div>
	<form action="#" class="mb-6">
		<div class="mb-6">
			<Label for="title" class="block mb-2">Title</Label>
			<Input id="title" name="title" required placeholder="Apple Keynote" />
		</div>
		<div class="mb-6">
			<Label for="description" class="mb-2">Description</Label>
			<Textarea id="message" placeholder="Write event description..." rows="4" name="message" />
		</div>
		<div class="mb-6">
			<Input id="date" name="date" required type="date" />
		</div>
		<div class="mb-4">
			<div class="relative">
				<Input noBorder id="search" placeholder="Add guest email" class="p-3" />
				<Button
					textSize="text-sm"
					class="absolute inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-primary-700 rounded-lg right-2 bottom-2 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					type="submit"
				>
					<UserPlusSolid class="w-3 h-3 mr-1.5 text-white" />Add
				</Button>
			</div>
		</div>
		<div class="flex mb-4 -space-x-4">
			<img
				class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
				src="/images/profile-picture-1.webp"
				alt=""
			/>
			<img
				class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
				src="/images/profile-picture-2.webp"
				alt=""
			/>
			<img
				class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
				src="/images/profile-picture-3.webp"
				alt=""
			/>
			<img
				class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
				src="/images/profile-picture-4.webp"
				alt=""
			/>
		</div>
		<Button type="submit" class="w-full">
			<CalendarEditSolid class="w-3.5 h-3.5 mr-2.5 text-white" /> Create event
		</Button>
	</form>
</Drawer>
