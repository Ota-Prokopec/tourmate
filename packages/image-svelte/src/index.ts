import ImageJs from 'image-js'
import { writable } from 'svelte/store'
import rawActions from './actions/index'
import { Base64 } from '@app/ts-types'
import { imageStore } from './actions/imageStore'

let image: ImageJs | undefined = undefined
imageStore.subscribe((value) => (image = value))

export default (url: string | Base64) => {
	const actions = rawActions(url, image)

	return [urlStore, imageStore, actions] as const
}
