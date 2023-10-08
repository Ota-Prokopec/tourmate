import { Base64, GetTypesOfmethodsInClass } from '@app/ts-types'
import { executeFunctionBeforeAndAfterClassMethod } from '@app/utils'
import ImageJs from 'image-js'
import { writable } from 'svelte/store'
import rotate from './actions/rotate'
import getCtx from './actions/getCtx'
import addText from './actions/addText'
import crop from './actions/crop'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian'

export default (
	{ howManyImagesBeforeUndoAvailable = 1 }: { howManyImagesBeforeUndoAvailable: number },
	callbackUrl: (url: string | Base64) => void,
) => {
	const ableToUndo = writable<boolean>(false)
	let image = new ImageJs()
	let history: ImageJs[] = [] //this is for that you had in history your first picture that you passed

	class Functions {
		constructor(public howManyImagesBeforeUndoAvailable: number = 1) {}
		async rotate(degree: number) {
			return rotate(image, degree)
		}
		async addText(...args: Parameters<typeof addText> extends [any, ...infer Rest] ? Rest : never) {
			return await addText(image, ...args)
		}
		async addFilter(filter: Filter) {
			return image[`${filter}Filter`]() as ImageJs
		}
		async load(url: string | Base64) {
			return await ImageJs.load(url)
		}

		async getCtx() {
			return getCtx(image)
		}

		async undo() {
			if (history.length < this.howManyImagesBeforeUndoAvailable + 1) return
			history = history.splice(0, history.length - 1)

			const Img = history.at(-1)
			if (!Img) throw new Error('Image is not available')
			image = Img

			ableToUndo.set(history.length > this.howManyImagesBeforeUndoAvailable)
			callbackUrl(`data:image/png;base64,${await image.toBase64()}`)
		}
		async crop(options: Parameters<typeof crop>[1]) {
			return crop(image, options)
		}
		async flipY() {
			return image.flipY()
		}
		async flipX() {
			return image.flipX()
		}
	}

	type Methods = GetTypesOfmethodsInClass<Functions>

	const Actions = executeFunctionBeforeAndAfterClassMethod<Methods, typeof Functions>(
		Functions,
		{
			after: async (resPromise, MyClass) => {
				const res = await resPromise
				if (res instanceof ImageJs) {
					image = res
					history.push(image) //add picture into history
					ableToUndo.set(history.length > new MyClass().howManyImagesBeforeUndoAvailable)

					callbackUrl(`data:image/png;base64,${await image.toBase64()}`)
				}
			},
		},
		{ after: ['undo'] },
	)

	const actions = new Actions(howManyImagesBeforeUndoAvailable)
	return [actions, ableToUndo] as const
}
