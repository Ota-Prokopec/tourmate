import type { Experience, ExperienceDocument } from '@app/ts-types'
import pkg from 'lodash'
const { merge, omit } = pkg
import { numberTimingCoords } from './settings'
import { Models } from '@app/appwrite-server'

export const transformExperienceDocumentsIntoExperience = (...expDocuments: ExperienceDocument[]): (Experience & Models.Document)[] =>
	expDocuments.map((exp) => ({
		...omit(exp, 'latitute', 'longitute'),
		...{
			location: [exp.latitude / numberTimingCoords, exp.longitude / numberTimingCoords],
		},
	}))
