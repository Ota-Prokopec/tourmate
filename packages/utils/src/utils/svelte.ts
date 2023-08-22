import { writable } from 'svelte/store'

export const useQueryWithCallback = <TRes>(initFunction: () => (callback: () => void) => void) => {
	if (typeof window === 'undefined') return writable(null)

	const func = initFunction()
}
