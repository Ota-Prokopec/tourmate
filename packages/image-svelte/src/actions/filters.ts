import ImageJs from 'image-js'
import { Writable } from 'svelte/store'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gausian'

export const addFilterAction = (image: ImageJs, store: Writable<ImageJs>) => {
	return (filter: Filter) => {
		const newImage = image[`${filter}Filter`]() as ImageJs
		store.set(newImage)
		return newImage
	}
}
