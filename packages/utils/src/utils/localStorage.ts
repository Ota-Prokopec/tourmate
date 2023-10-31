import { proxify } from './treasureUtils'
const isTrivial = (val: unknown) => typeof val !== 'object' && typeof val !== 'function'
const isBrowser = () => typeof window !== 'undefined'

const browserStorage = new Proxy<Record<string | number | symbol, any>>(
	{},
	{
		set(_target, key, value) {
			if (!isBrowser()) throw new TypeError('Window is not defined')
			if (!isTrivial(value)) {
				window.localStorage.setItem(
					key.toString(),
					JSON.stringify(value, (_key, value) =>
						typeof value === 'string' ? `'${value}'` : value,
					),
				)
				return true
			}

			window.localStorage.setItem(key.toString(), value.toString())

			return true
		},
		deleteProperty(_target, key) {
			if (!isBrowser()) throw new TypeError('Window is not defined')
			window.localStorage.removeItem(key.toString())
			return true
		},
		get(_target, key) {
			console.log(key)

			const item = window.localStorage.getItem(key.toString())
			if (!item) return null

			try {
				const shalowObject = JSON.parse(item) as Record<string, any>
				return proxify(window.localStorage, shalowObject, key.toString(), shalowObject)
			} catch (e) {
				return item
			}
		},
		has(_target, key) {
			return window.localStorage.getItem(key.toString()) !== null
		},
		ownKeys() {
			return Object.keys(window.localStorage)
		},
		getOwnPropertyDescriptor(_target, key) {
			return {
				configurable: true,
				enumerable: true,
				value: window.localStorage.getItem(key.toString()),
				writable: true,
			}
		},
		apply(target, thisArg, args) {
			return target.apply(thisArg, args)
		},
	},
)

export default browserStorage
