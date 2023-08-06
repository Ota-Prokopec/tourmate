import type { Base64 } from '@app/ts-types'

export function getParsed(parsing: string) {
	return parsing[0] === '[' || parsing[0] === '{' ? JSON.parse(parsing) : parsing
}
export const uniqueArrayItems = (arr: Array<any>) => {
	return arr.filter((item, i, arr) => {
		if (arr.indexOf(item) === i) return item
	})
}
export function removeItemsFromArray(array: any[], ...forDeletion: any) {
	return array.filter((item) => !forDeletion.includes(item))
}

export const isBase64 = (value: unknown): value is Base64 => {
	if (typeof value !== 'string') return false
	return value.startsWith('data:image/')
}
export const isFile = (value: unknown): value is File => {
	if (value instanceof File) return true
	return false
}
export const base64ToBlob = (b64Data: string, contentType: string, sliceSize = 512) => {
	const byteCharacters = atob(b64Data)
	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)

		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}

	const blob = new Blob(byteArrays, { type: contentType })
	return blob
}

export const blobToBase64 = (blob: Blob): Promise<Base64> => {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result as Base64)
		reader.readAsDataURL(blob)
	})
}
