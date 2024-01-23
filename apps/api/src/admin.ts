import appwrite from './lib/appwrite/appwrite'

// export const admin = () => {
// 	const { collections } = appwrite.setAdmin()
// 	places.map(async (place) => {
// 		const placeDetail = await collections.placeDetail.createDocument({
// 			name: place.location,
// 		})
// 		console.log(placeDetail._id)

// 		collections.monument.createDocument({
// 			latitude: place.coordinates.latitude,
// 			longitude: place.coordinates.longitude,
// 			name: place.name,
// 			pictureURL: place.pictureUrl,
// 			placeDetailId: placeDetail._id,
// 			transports: [],
// 			userId: '6595c243034e1f13493a',
// 		})
// 	})
// }
