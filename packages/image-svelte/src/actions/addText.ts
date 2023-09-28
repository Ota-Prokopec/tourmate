import ImageJs from 'image-js'
import getCtx from './getCtx'

export default async (
	image: ImageJs,
	text: string,
	position: [number, number],
	options?: {
		textAlign?: CanvasTextAlign
		textBaseline?: CanvasTextBaseline
		font?: string
		color?: string | CanvasGradient | CanvasPattern
		maxWidth?: number
	},
) => {
	const ctx = await getCtx(image)
	if (!ctx) throw new Error('Ctx is not available')

	const fontSize = options?.font ? parseInt(options.font.split(' ')[0].slice(0, options.font.split(' ')[0].length - 2)) : text.length

	const textWidth = text.length * fontSize

	if (options) {
		if (options.textAlign) ctx.textAlign = options.textAlign
		if (options.textBaseline) ctx.textBaseline = options.textBaseline
		if (options.font) ctx.font = options.font
		if (options.color) ctx.fillStyle = options.color
		if (options.maxWidth) {
		}
	}

	if (options?.maxWidth && textWidth > options?.maxWidth) {
		let count = 0
		text = text
			.split('')
			.map((char, i) => {
				if (!options.maxWidth) throw new Error('options.maxWidth is not defined')
				count += i
				console.log(count * fontSize, options.maxWidth)

				if (count * fontSize > options.maxWidth) {
					count = 0
					return `\n${char}`
				} //when the text overflows
				else char
			})
			.join('')
	}

	console.log(text)

	ctx.imageSmoothingEnabled = false
	ctx.fillText(text, ...position)

	const newImage = await ImageJs.load(ctx.canvas.toDataURL('image/png'))
	return newImage
}
