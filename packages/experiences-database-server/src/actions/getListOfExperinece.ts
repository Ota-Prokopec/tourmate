import appwrite from '@app/appwrite-ssr-experiences'
import { Query } from '@app/appwrite-server'
import { transformExperienceDocumentsIntoExperience } from '../transformers'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export const getListOfExperinece = async (
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
	{ limit }: { limit: number } = { limit: 100 },
) => {
	const experienceDocuments = await collections.experience.listDocuments([Query.limit(limit)])
	const experiencesGraphql = transformAppwriteDocumentsIntoGraphqlDocuments(
		...transformExperienceDocumentsIntoExperience(...experienceDocuments.documents),
	)

	return experiencesGraphql
}
