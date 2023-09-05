import type { Experience, ExperienceDocument, Monument, MonumentDocument } from '@app/ts-types'
import pkg from 'lodash'
const { merge, omit } = pkg
import { numberTimingCoords } from './settings'
import { Models } from '@app/appwrite-server'

export const transformExperienceDocumentsIntoExperience = (...expDocuments: ExperienceDocument[]): (Experience & Models.Document)[] =>
	expDocuments.map((exp) => ({
		...omit(exp, 'latitude', 'longitude'),
		...{
			location: [exp.latitude / numberTimingCoords, exp.longitude / numberTimingCoords],
		},
	}))

export const transformMonumentsDocumentsIntoMonuments = (...expDocuments: MonumentDocument[]): (Monument & Models.Document)[] =>
	expDocuments.map((exp) => ({
		...omit(exp, 'latitude', 'longitude'),
		...{
			location: [exp.latitude / numberTimingCoords, exp.longitude / numberTimingCoords],
		},
	}))
