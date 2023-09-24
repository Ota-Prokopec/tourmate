import ImageJs from 'image-js'
import { addTextAction } from './addText'
import { getCtxAction } from './getCtx'
import { Writable } from 'svelte/store'
import { addFilterAction } from './filters'
import { rotateAction } from './rotate'
import { Base64 } from '@app/ts-types'

export default (url: string | Base64, imageStore: Writable<ImageJs>, urlStore: Writable<string | Base64>) => {
	const addText = addTextAction(url, imageStore, urlStore)
	const getCtx = getCtxAction(url)
	const addFilter = addFilterAction(url, imageStore, urlStore)
	const rotate = rotateAction(url, imageStore, urlStore)

	return {
		addText,
		getCtx,
		addFilter,
		rotate,
	}
}
