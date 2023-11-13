import * as lodash from 'lodash'
import { get } from './fetching'
import type { IP, IPApiResponse, Location } from '@app/ts-types'
import * as geolocationUtils from 'geolocation-utils'

export const metersOfOneDegree = 111000

export const getUsersLocation = (
	options: PositionOptions = { enableHighAccuracy: false },
): Promise<Location> => {
	return new Promise((res) => {
		if (typeof window === 'undefined') throw new Error('You called this on server side')

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					res([position.coords.latitude, position.coords.longitude])
				},
				(err) => {
					throw err
				},
				options,
			)
		} else {
			throw new Error('Users location was not successfull')
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

export const degreeToMeters = (degree: number) => {
	return degree * metersOfOneDegree
}

export const metersToDegree = (meters: number) => {
	return meters / metersOfOneDegree
}

/**
 * @returns time in seconds
 */
export const getTimeFromAToB = (
	location1: Location,
	location2: Location,
	speed: number,
) => {
	const distance = geolocationUtils.distanceTo(
		{ lat: location1[0], lng: location1[1] },
		{ lat: location2[0], lng: location2[1] },
	)
	return distance / speed
}

export const getLocationUrlOfGoogleMaps = (location: Location) => {
	return `https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`
}

/**
 * @returns meters
 */
export const distanceTo = (location1: Location, location2: Location) =>
	geolocationUtils.distanceTo(
		{ lat: location1[0], lng: location1[0] },
		{ lat: location2[0], lng: location2[1] },
	)
