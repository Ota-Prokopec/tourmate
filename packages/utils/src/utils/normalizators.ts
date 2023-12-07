import { getPrettyNumber } from './prettier'
import * as date from 'date-fns'
export const normalizeMeters = (meters: number) => {
	return `${getPrettyNumber(meters)}m`
}

export const normalizeTime = (seconds: number, delimeter?: string) => {
	const duration = date.intervalToDuration({ start: 0, end: seconds * 1000 })
	const formated = date.formatDuration(duration, {
		delimiter: delimeter ? ` ${delimeter} ` : undefined,
	})
	return formated
}
