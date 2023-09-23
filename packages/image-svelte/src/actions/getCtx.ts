import ImageJs from 'image-js'
import { Writable } from 'svelte/store'
export const getCtxAction = (image: ImageJs) => {
	return () => {
		if (!image) throw new Error('Image is not available')
		const canvas = image.getCanvas()
		const ctx = canvas.getContext('2d')

		return ctx
	}
}
