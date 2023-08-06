import { z } from 'zod'
import { Base64 } from './TsTypes'
import { isBase64 } from '@app/utils'

export const bufferTypeZod = z.custom<Buffer>((value) => {
	if (value instanceof Buffer) {
		return { success: true, data: value }
	} else if (typeof value === 'string') {
		try {
			const buffer = Buffer.from(value, 'base64')
			return { success: true, data: buffer }
		} catch (err) {
			return { success: false, error: 'Invalid base64 string' }
		}
	} else {
		return { success: false, error: 'Value must be a Buffer or a base64 string' }
	}
})

export const base64TypeZod = z.custom<Base64>((value) => {
	if (typeof value !== 'string') return { success: false, error: 'Invalid base64 string' }
	if (!isBase64(value)) return { success: false, error: 'Invalid base64 string' }
	else return { success: true, data: value }
})

export const fileZod = z.custom<File>((value) => {
	if (value instanceof File) return { success: true, data: value }
	else return { success: false, error: 'Invalid File' }
})
