import * as lodash from 'lodash'
const { merge, pick } = lodash
import { get } from './fetching'
import type { IP, IPApiResponse, Location } from '@app/ts-types'
import { getPrettyNumber } from './prettier'

export const getUsersLocation = (
	options: PositionOptions = { enableHighAccuracy: true },
): Promise<Location> => {
	return new Promise((res) => {
		if (typeof window === 'undefined') res([0, 0])
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					res([position.coords.latitude, position.coords.longitude])
				},
				() => {},
				options,
			)
		}
	})
}

export const watchUsersLocation = (
	callback: (location: Location) => void,
	options: PositionOptions = { enableHighAccuracy: true },
): void => {
	navigator.geolocation.watchPosition(
		(position) => {
			callback([position.coords.latitude, position.coords.longitude])
		},
		() => {},
		options,
	)
}

export const getUsersLocationDataByIP = async (ip: IP): Promise<IPApiResponse> => {
	const res = await get(`https://ipapi.co/${ip}/json/`)
	return res as IPApiResponse
}

export const distanceBetweenTwoLocations = (location1: Location, location2: Location) => {
	return Math.abs(location1[0] - location2[0]) + Math.abs(location1[1] - location2[1])
}

export const degreeToMeters = (degree: number) => {
	return getPrettyNumber(degree * 111_111)
}
export const metersToDegree = (meters: number) => {
	return meters / 111_111
}
