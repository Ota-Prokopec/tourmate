import ImageJs from 'image-js'
import { addTextAction } from './addText'
import { getCtxAction } from './getCtx'
import { Writable } from 'svelte/store'
import { addFilterAction } from './filters'

export default (image: ImageJs, store: Writable<ImageJs>) => {
	const addText = addTextAction(image, store)
	const getCtx = getCtxAction(image)
	const addFilter = addFilterAction(image, store)

	return {
		addText,
		getCtx,
		addFilter,
	}
}
