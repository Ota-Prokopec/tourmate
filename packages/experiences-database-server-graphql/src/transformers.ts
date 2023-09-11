import type { Experience, ExperienceGraphqlDocument, GraphqlDocument, Monument, MonumentGraphqlDocument } from '@app/ts-types'
import pkg from 'lodash'
const { omit } = pkg
import { numberTimingCoords } from '@app/experience-settings'

export const transformExperienceDocumentsIntoExperience = (...expDocuments: ExperienceGraphqlDocument[]): GraphqlDocument<Experience>[] =>
	expDocuments.map((exp) => ({
		...omit(exp, 'latitude', 'longitude'),
		...{
			location: [exp.latitude / numberTimingCoords, exp.longitude / numberTimingCoords],
		},
	}))

export const transformMonumentsDocumentsIntoMonuments = (...expDocuments: MonumentGraphqlDocument[]): GraphqlDocument<Monument>[] =>
	expDocuments.map((exp) => ({
		...omit(exp, 'latitude', 'longitude'),
		...{
			location: [exp.latitude / numberTimingCoords, exp.longitude / numberTimingCoords],
		},
	}))
