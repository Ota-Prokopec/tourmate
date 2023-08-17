import lodash from 'lodash'
const { merge, pick } = lodash
import { get } from './fetching'
import { IP, IPApiResponse } from '@app/ts-types'

export const getUsersLocation = (): Promise<[number, number]> => {
	return new Promise((res) => {
		if (typeof window === 'undefined') res([0, 0])
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				res([position.coords.latitude, position.coords.longitude])
			})
		}
	})
}

export const getDetailsByLatAndLong = async (lat: number, long: number) => {
	const res: {
		display_name: string
		address: {
			suburb?: string
			postcode?: string
			country: string
			city?: string
			state: string
		}
	} = await get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)

	return merge(pick(res?.address, 'country', 'postcode', 'suburb', 'city', 'state'), {
		fullName: res.display_name,
		name: res.address.suburb ?? res.address.city ?? res.address.state ?? res.address.country ?? res.display_name,
	})
}

export const getUsersLocationDataByIP = async (ip: IP): Promise<IPApiResponse> => {
	const res = await get(`https://ipapi.co/${ip}/json/`)
	return res
}
