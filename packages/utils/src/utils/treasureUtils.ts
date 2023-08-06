export interface Storage {
	readonly length: number
	clear(): void
	getItem(key: string): string | null
	key(index: number): string | null
	removeItem(key: string): void
	setItem(key: string, value: string): void
	[name: string]: any
}

export const isTrivial = (val: unknown): val is string | number | boolean | null | undefined => val === null || val === undefined || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'

export function proxify(storage: Storage, shalow: Record<string, any>, key: string, curr: Record<string, any>) {
	return new Proxy(curr, {
		get(target, prop): any {
			return proxify(storage, shalow, key, target[prop.toString()])
		},
		set(target, prop, value) {
			target[prop.toString()] = value
			storage.setItem(key, JSON.stringify(shalow))

			return true
		},
		deleteProperty(target, prop) {
			delete target[prop.toString()]
			storage.setItem(key, JSON.stringify(shalow))

			return true
		},
		has(target, prop) {
			return prop in target
		},
		ownKeys(target) {
			return Object.keys(target)
		},
		getOwnPropertyDescriptor(target, prop) {
			return Object.getOwnPropertyDescriptor(target, prop)
		},
	})
}
