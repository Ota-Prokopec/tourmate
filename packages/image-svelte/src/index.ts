import ImageJs from 'image-js'
import { writable } from 'svelte/store'
import rawActions from './actions/index'
import { Base64 } from '@app/ts-types'

export default (url: string | Base64) => {
	const imageStore = writable<ImageJs>()
	const urlStore = writable<string | Base64>(url)

	const actions = rawActions(url, imageStore, urlStore)

	return [urlStore, imageStore, actions] as const
}
