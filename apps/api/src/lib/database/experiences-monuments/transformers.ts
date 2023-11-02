import { Types } from '@app/appwrite-ssr-graphql'
import type { Location } from '@app/ts-types'
import pkg from 'lodash'
const { omit } = pkg

export const fromLatLongIntoLocation = <
	TDocument extends Types.Document<
		{ latitude: number; longitude: number } & Record<string, any>
	>,
>(
	...docs: TDocument[]
) => {
	return docs.map((doc) => ({
		...omit(doc, 'latitude', 'longitude'),
		...{
			location: [doc.latitude, doc.longitude] as Location,
		},
	}))
}
