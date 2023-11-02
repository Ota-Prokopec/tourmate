import { Base64, GetTypesOfmethodsInClass } from '@app/ts-types'
import { executeFunctionBeforeAndAfterClassMethod } from '@app/utils'
import ImageJs, { Image } from 'image-js'
import { writable } from 'svelte/store'
import rotate from './actions/rotate'
import getCtx from './actions/getCtx'
import addText from './actions/addText'
import crop from './actions/crop'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian' | 'grey'

export type Actions =
	| 'rotate'
	| 'addText'
	| 'addFilter'
	| 'load'
	| 'getCtx'
	| 'undo'
	| 'crop'
	| 'flipY'
	| 'flipX'

export default (
	{ howManyImagesBeforeUndoAvailable = 1 }: { howManyImagesBeforeUndoAvailable: number },
	change?: (
		url: string | Base64,
		options: { width: number; height: number },
		action: Actions,
		history: ImageJs[],
		imageJs: ImageJs,
	) => void,
	undo?: (
		url: string | Base64,
		options: { width: number; height: number },
		history: ImageJs[],
		imageJs: ImageJs,
	) => void,
) => {
	const ableToUndo = writable<boolean>(false)
	let image = new ImageJs()
	const historyStore = writable<ImageJs[]>([])
	let history: ImageJs[] = [] //this is for that you had in history your first picture that you passed

	historyStore.subscribe((his) => {
		// update history for non svelte code
		history = his
	})

	class Functions {
		async rotate(degree: number) {
			return rotate(image, degree)
		}
		async addText(
			...args: Parameters<typeof addText> extends [any, ...infer Rest] ? Rest : never
		) {
			return await addText(image, ...args)
		}
		async addFilter(filter: Filter) {
			if (filter === 'grey') {
				return image.grey()
			}
			return image[`${filter}Filter`]() as ImageJs
		}
		async load(url: string | Base64) {
			return await ImageJs.load(url)
		}
		async loadCanvas(canvas: HTMLCanvasElement) {
			return await this.load(canvas.toDataURL('image/png'))
		}
		async loadImage(imagejs: ImageJs) {
			return imagejs
		}
		async addImage(image: Image, coords: [number, number]) {
			const ctx = await this.getCtx()
			if (!ctx) throw new Error('Ctx is not available')
			ctx.drawImage(image, ...coords)
			return await this.load(ctx.canvas.toDataURL('image/png'))
		}

		async getCtx() {
			return getCtx(image)
		}

		async undo() {
			if (history.length < howManyImagesBeforeUndoAvailable + 1) return
			historyStore.update((curHis) => curHis.splice(0, curHis.length - 1)) //remove picture from history

			const Img = history.at(-1)

			if (!Img) throw new Error('Image is not available')
			image = Img

			ableToUndo.set(history.length > howManyImagesBeforeUndoAvailable)
			const url = `data:image/png;base64,${await image.toBase64()}`

			if (change) change(url, { ...image }, 'undo', history, image)
			if (undo) undo(url, { ...image }, history, image)
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
			after: async (resPromise, MyClass, propertyName) => {
				const res = await resPromise
				if (res instanceof ImageJs) {
					image = await res
					historyStore.update((currentHistory) => [...currentHistory, image]) //add picture into history

					ableToUndo.set(history.length > howManyImagesBeforeUndoAvailable)
					const url = `data:image/png;base64,${await image.toBase64()}`
					if (change) change(url, { ...image }, propertyName as Actions, history, image)
				}
			},
		},
		{ after: ['undo'] },
	)

	const actions = new Actions()
	return [actions, ableToUndo, historyStore] as const
}
