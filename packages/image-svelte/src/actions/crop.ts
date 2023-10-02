import ImageJs from 'image-js'

export default async (image: ImageJs, options: Parameters<typeof image.crop>[0]) => {
	return image.crop(options)
}
