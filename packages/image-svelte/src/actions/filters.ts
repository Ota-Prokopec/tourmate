import { Base64 } from '@app/ts-types'
import ImageJs from 'image-js'
import { Writable } from 'svelte/store'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian'

export const addFilterAction = (imageStore: Writable<ImageJs>, urlStore: Writable<string | Base64>) => {
	return async (filter: Filter) => {
		urlStore.subscribe(() => {})
		const image = await ImageJs.load(url)
		const newImage = image[`${filter}Filter`]() as ImageJs
		imageStore.set(newImage)
		urlStore.set(await newImage.toBase64())
		return newImage
	}
}
