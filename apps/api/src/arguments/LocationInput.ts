import { inputObjectType } from 'nexus'

export const defaultRangeMeters = 700

export default inputObjectType({
	name: 'LocationInput',
	definition: (t) => {
		t.field({ name: 'location', type: 'Location' })
		t.nullable.float('rangeMeters', { default: defaultRangeMeters }) //7000 meters
	},
})
