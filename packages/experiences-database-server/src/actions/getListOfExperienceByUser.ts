import appwrite from '@app/appwrite-ssr-experiences'
import { Query } from '@app/appwrite-server'
import { transformExperienceDocumentsIntoExperience } from '../transformers'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export const getListOfExperineceByUser = async (
	{ limit = 100, userId }: { limit?: number; userId: string },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const experienceDocuments = await collections.experience.listDocuments([Query.limit(limit), Query.equal('userId', userId)])
	const experiencesGraphql = transformAppwriteDocumentsIntoGraphqlDocuments(
		...transformExperienceDocumentsIntoExperience(...experienceDocuments.documents),
	)

	return experiencesGraphql
}
