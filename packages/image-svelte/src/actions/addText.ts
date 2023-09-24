import ImageJs from 'image-js'
import { getCtxAction } from './getCtx'
import { Writable } from 'svelte/store'
import { Base64 } from '@app/ts-types'

export const addTextAction = (url: string | Base64, imageStore: Writable<ImageJs>, urlStore: Writable<string | Base64>) => {
	return async (
		text: string,
		position: [number, number],
		options: { textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline; font: string; color: string | CanvasGradient | CanvasPattern },
		color?: string,
	) => {
		const image = await ImageJs.load(url)
		if (!image) throw new Error('Image is not available')
		const ctx = await getCtxAction(url)()
		if (!ctx) throw new Error('Ctx is not available')

		ctx.textAlign = options.textAlign
		ctx.textBaseline = options.textBaseline
		ctx.font = options.font
		ctx.fillStyle = options.color
		ctx.imageSmoothingEnabled = false
		ctx.fillText(text, ...position)

		const newImage = await ImageJs.load(ctx.canvas.toDataURL('image/png'))
		imageStore.set(newImage)
		urlStore.set(await newImage.toBase64())
		return newImage
	}
}
