import { Base64 } from '@app/ts-types'
import ImageJs from 'image-js'
export const getCtxAction = (url: string | Base64) => {
	return async () => {
		const image = await ImageJs.load(url)
		if (!image) throw new Error('Image is not available')
		const canvas = image.getCanvas()
		const ctx = canvas.getContext('2d')

		return ctx
	}
}
