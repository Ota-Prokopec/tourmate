import type { Base64 } from '@app/ts-types'

export function getParsed(parsing: string) {
	return parsing[0] === '[' || parsing[0] === '{' ? JSON.parse(parsing) : parsing
}
export const uniqueArrayItems = (arr: Array<any>) => {
	return arr.filter((item, i, arr) => {
		if (arr.indexOf(item) === i) return item
	})
}
export function removeItemsFromArray<TArray extends unknown[]>(
	array: TArray,
	...forDeletion: TArray[number][]
) {
	return array.filter((item) => !forDeletion.includes(item)) as TArray
}

export const base64ToBlob = (base64: string, contentType: string, sliceSize = 512) => {
	const byteCharacters = atob(base64)
	const byteArrays: Uint8Array[] = []

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

export const countSameItemsInArray = <InputArr extends Array<any>>(
	arr: InputArr,
): Record<string, number> =>
	arr.reduce(
		(cnt, cur) => (
			(cnt[typeof cur === 'string' ? cur : JSON.stringify(cur)] =
				cnt[typeof cur === 'string' ? cur : JSON.stringify(cur)] + 1 || 1),
			cnt
		),
		{},
	)

export const roundNumber = (num: number, digits: number): number => {
	const value = JSON.parse(num.toFixed(digits))
	if (typeof value === 'number') return value
	throw new Error('Input is not a number')
}

export const arrayBufferIntoBase64 = (arrBuff: ArrayBuffer): Base64 =>
	Buffer.from(arrBuff).toString('base64') as Base64

export const fileToBase64 = (file: File): Promise<Base64> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as Base64)
		reader.onerror = () => reject(reader.error)
	})
}

export const base64ToFile = (base64: Base64, fileName: string) => {
	const buffer = Buffer.from(base64, 'base64')
	return new File([buffer], fileName)
}

export const base64ToBuffer = (base64: Base64 | string) => {
	return Buffer.from(base64, 'base64')
}
