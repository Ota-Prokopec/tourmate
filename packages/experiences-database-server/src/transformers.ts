import type { Experience, ExperienceDocument } from '@app/ts-types'
import { extend, omit } from 'lodash'
import { numberTimingCoords } from './settings'
import { Models } from '@app/appwrite-server'

export const transformExperienceDocumentIntoExperience = (...expDocuments: ExperienceDocument[]) => {
	return expDocuments.map((exp) =>
		extend(omit(exp, 'latitute', 'longitute'), {
			location: [exp.latitute / numberTimingCoords, exp.longitute / numberTimingCoords],
		}),
	) as (Experience & Models.Document)[]
}
