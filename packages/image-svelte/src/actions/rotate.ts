import ImageJs from 'image-js'
import { Writable } from 'svelte/store'
import { Base64 } from '@app/ts-types'

export const rotateAction = (url: string | Base64, imageStore: Writable<ImageJs>, urlStore: Writable<string | Base64>) => {
	return async (degree: number) => {
		const image = await ImageJs.load(url)

		const newImage = image.rotate(degree)
		imageStore.set(newImage)
		urlStore.set(await newImage.toBase64())
		return newImage
	}
}
