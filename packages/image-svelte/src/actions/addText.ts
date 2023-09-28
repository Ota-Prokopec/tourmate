import ImageJs from 'image-js'
import getCtx from './getCtx'
import { CanvasTextConfig, drawText } from 'canvas-txt'

export default async (image: ImageJs, text: string, options: CanvasTextConfig & { color: string }) => {
	const ctx = await getCtx(image)
	if (!ctx) throw new Error('Ctx is not available')

	ctx.fillStyle = options.color

	const { height } = drawText(ctx, text, options)

	const newImage = await ImageJs.load(ctx.canvas.toDataURL('image/png'))
	return newImage
}
