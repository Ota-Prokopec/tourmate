import ImageJs from 'image-js'
import { getCtxAction } from './getCtx'
import { Writable } from 'svelte/store'

export const addTextAction = (image: ImageJs, store: Writable<ImageJs>) => {
	return async (
		text: string,
		position: [number, number],
		options: { textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline; font: string; color: string | CanvasGradient | CanvasPattern },
		color?: string,
	) => {
		if (!image) throw new Error('Image is not available')
		const ctx = getCtxAction(image)()
		if (!ctx) throw new Error('Ctx is not available')

		ctx.textAlign = options.textAlign
		ctx.textBaseline = options.textBaseline
		ctx.font = options.font
		ctx.fillStyle = options.color
		ctx.imageSmoothingEnabled = false
		ctx.fillText(text, ...position)
		store.set(image)
		return await ImageJs.load(ctx.canvas.toDataURL('image/png'))
	}
}
