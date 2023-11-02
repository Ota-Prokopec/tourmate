import ImageJs from 'image-js'

export default (image: ImageJs) => {
	const canvas = image.getCanvas()
	const ctx = canvas.getContext('2d')
	return ctx
}
