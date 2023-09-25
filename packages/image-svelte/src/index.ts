import { Base64, GetTypesOfmethodsInClass } from '@app/ts-types'
import { executeFunctionBeforeAndAfterClassMethod } from '@app/utils'
import ImageJs from 'image-js'
import { writable } from 'svelte/store'

export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian'

export const imgUrl = writable<string>()
let image = new ImageJs()

class Actions {
	constructor() {}
	rotate(degree: number): ImageJs {
		return image.rotate(degree)
	}
	getCtx() {
		const canvas = image.getCanvas()
		const ctx = canvas.getContext('2d')
		return ctx
	}
	async addText(
		text: string,
		position: [number, number],
		options: {
			textAlign: CanvasTextAlign
			textBaseline: CanvasTextBaseline
			font: string
			color: string | CanvasGradient | CanvasPattern
		},
	): Promise<ImageJs> {
		const ctx = await this.getCtx()
		if (!ctx) throw new Error('Ctx is not available')

		ctx.textAlign = options.textAlign
		ctx.textBaseline = options.textBaseline
		ctx.font = options.font
		ctx.fillStyle = options.color
		ctx.imageSmoothingEnabled = false
		ctx.fillText(text, ...position)

		const newImage = await ImageJs.load(ctx.canvas.toDataURL('image/png'))
		return newImage
	}
	addFilter(filter: Filter): ImageJs {
		const newImage = image[`${filter}Filter`]() as ImageJs
		return newImage
	}
	async load(url: string | Base64) {
		await ImageJs.load(url)
	}
}

type Methods = GetTypesOfmethodsInClass<Actions>

const actions = executeFunctionBeforeAndAfterClassMethod<Actions, Methods>(new Actions(), {
	after: async (res) => {
		if (res instanceof ImageJs) {
			image = res
			imgUrl.set(await res.toBase64())
		}
	},
})
export default () => [imgUrl, actions] as const
