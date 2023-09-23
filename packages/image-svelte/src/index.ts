import ImageJs from 'image-js'
import { writable } from 'svelte/store'
import rawActions from './actions/index'

export default (image: ImageJs) => {
	const store = writable<ImageJs>()

	const actions = rawActions(image, store)

	return [store, actions]
}
