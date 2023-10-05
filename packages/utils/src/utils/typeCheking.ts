import { Base64 } from '@app/ts-types'

export const isBase64 = (value: unknown): value is Base64 => {
	if (typeof value !== 'string') return false
	return value.startsWith('data:image/')
}
export const isFile = (value: unknown): value is File => {
	if (value instanceof File) return true
	return false
}

export const isURL = (value: unknown): value is URL => {
	return typeof value === 'string' && value.startsWith('http')
}

export const urlToString = (url: URL | undefined | null): string | undefined => {
	return url as unknown as string | undefined
}
