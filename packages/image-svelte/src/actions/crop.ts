import ImageJs from 'image-js'

export default async (
	image: ImageJs,
	options: { x: number | 'center'; y: number | 'center'; width: number | 'max'; height: number | 'max' },
) => {
	const { width: canvasWidth, height: canvasHeight } = image.getCanvas()

	if (options.width === 'max') options.width = canvasWidth
	if (options.height === 'max') options.height = canvasHeight
	if (options.x === 'center') options.x = (canvasWidth - options.width) / 2
	if (options.y === 'center') options.y = (canvasHeight - options.height) / 2

	console.log(options)

	return image.crop({
		height: options.height,
		width: options.width,
		x: options.x,
		y: options.y,
	})
}
