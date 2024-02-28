/*import appwrite from './lib/appwrite/appwrite'



export const admin = () => {
	const { collections } = appwrite.setAdmin()
	places.map(async (place) => {
		const placeDetail = await collections.placeDetail.createDocument({
			name: place.location,
		})
		console.log(placeDetail._id)

		collections.monument.createDocument({
			latitude: place.coordinates.latitude,
			longitude: place.coordinates.longitude,
			name: place.name,
			pictureURL: place.pictureUrl,
			placeDetailId: placeDetail._id,
			transports: [],
			userId: '6595c243034e1f13493a',
		})
	})
}*/

const places = [
	{
		name: "Kutná Hora - St. Barbara's Church",
		location: 'Kutná Hora',
		coordinates: { latitude: 49.9524, longitude: 15.2687 },
		pictureUrl:
			'https://upload.wikimedia.org/wikipedia/commons/e/ef/Kutn%C3%A1_Hora%2C_Sv._B%C3%A1rbara_%28Barborsk%C3%BD_kostel%29.jpg',
	},
	{
		name: 'Olomouc - Holy Trinity Column',
		location: 'Olomouc',
		coordinates: { latitude: 49.5937, longitude: 17.2509 },
		pictureUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Olomouc%2C_Hl._trojice_na_Horn%C3%ADm_n%C3%A1m%C4%9Bst%C3%AD.jpg/800px-Olomouc%2C_Hl._trojice_na_Horn%C3%ADm_n%C3%A1m%C4%9Bst%C3%AD.jpg',
	},
]

import wiki from 'wikipedia'

export const admin = async () => {
	places.map(async (place) => {
		console.log(place)

		const res = await wiki.images("St._Barbara's_Church_(Kutná_Hora)")
		console.log(res.at(res.length - 1)?.imageinfo.at(0).url)
	})
}
