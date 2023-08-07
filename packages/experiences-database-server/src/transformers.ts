import type { Experience, ExperienceDocument } from '@app/ts-types'
import pkg from 'lodash'
const { merge, omit } = pkg
import { numberTimingCoords } from './settings'
import { Models } from '@app/appwrite-server'

export const transformExperienceDocumentIntoExperience = (...expDocuments: ExperienceDocument[]) => {
	return expDocuments.map((exp) =>
		merge(omit(exp, 'latitute', 'longitute'), {
			location: [exp.latitute / numberTimingCoords, exp.longitute / numberTimingCoords],
		}),
	) as (Experience & Models.Document)[]
}
