import { Base64, Location, Topic, Transport, transportZod } from '@app/ts-types'
import { topicZod } from '@app/ts-types/src/Topic'

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

export const isLocation = (arg: unknown): arg is Location =>
	Array.isArray(arg) &&
	typeof arg[0] === 'number' &&
	typeof arg[1] === 'number' &&
	arg.length === 2

export const isTopic = (arg: unknown): arg is Topic => {
	try {
		topicZod.parse(arg)
		return true
	} catch (error) {
		return false
	}
}

export const isTransport = (arg: unknown): arg is Transport => {
	try {
		transportZod.parse(arg)
		return true
	} catch (error) {
		return false
	}
}
