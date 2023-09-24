import { Base64 } from '@app/ts-types'
import ImageJs from 'image-js'
import { Writable } from 'svelte/store'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian'

export const addFilterAction = (image: ImageJs) => {
	return async (filter: Filter) => {
		const newImage = image[`${filter}Filter`]() as ImageJs
		imageStore.set(newImage)
		return newImage
	}
}
