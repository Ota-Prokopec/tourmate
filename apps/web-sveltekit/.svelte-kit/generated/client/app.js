export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25')
];

export const server_loads = [0,2,4,5];

export const dictionary = {
		"/(app)/(main)": [~8,[2,3]],
		"/(app)/account/[myId]": [9,[2,4]],
		"/(app)/account/[myId]/edit": [~10,[2,4]],
		"/(app)/addMonument": [11,[2,5]],
		"/(app)/addMonument/detail/[lat]-[lng]": [~12,[2,5]],
		"/(authorization)/auth/forgottonpassword": [17,[7]],
		"/(authorization)/auth/forgottonpassword/resetpassword": [18,[7]],
		"/(authorization)/auth/login": [19,[7]],
		"/(authorization)/auth/oauth2/failure": [20,[7]],
		"/(authorization)/auth/oauth2/success": [~21,[7]],
		"/(authorization)/auth/register": [22,[7]],
		"/(authorization)/auth/register/verifyemail/[myId]": [24,[7]],
		"/(authorization)/auth/register/[username]-[myId]": [~23,[7]],
		"/(app)/createNewExperience": [~13,[6]],
		"/(app)/experience/[experienceId]": [~14,[2]],
		"/(app)/monument/[monumentId]": [~15,[2]],
		"/(app)/search": [~16,[2]],
		"/test": [25]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';