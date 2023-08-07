import { merge, pick } from 'lodash'
import { post } from './fetching'

export const getUsersLocation = (): Promise<[number, number]> => {
	return new Promise((res) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				res([position.coords.latitude, position.coords.longitude])
			})
		}
	})
}

export const getDetailsByLatAndLong = async (lat: number, long: number) => {
	const res: {
		display_name?: string
		address?:
			| {
					suburb?: string
					postcode?: string
					country?: string
					city?: string
					state?: string
			  }
			| undefined
	} = await post(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
	return merge(pick(res?.address, 'country', 'postcode', 'suburb', 'city', 'state'), {
		fullName: res?.display_name,
		name: `${res?.display_name?.split(',')[0]} ${res?.display_name?.split(',')[1]}`,
	})
}
