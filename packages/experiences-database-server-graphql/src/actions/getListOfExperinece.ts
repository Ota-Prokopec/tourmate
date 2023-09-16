import appwrite from '@app/appwrite-ssr-experiences-graphql'
import { Query } from '@app/appwrite-server'
import { transformExperienceDocumentsIntoExperience } from '../transformers'

export const getListOfExperinece = async (
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
	{ limit }: { limit: number } = { limit: 100 },
) => {
	const experienceDocuments = await collections.experience.listDocuments([Query.limit(limit)])
	return transformExperienceDocumentsIntoExperience(...experienceDocuments.documents)
}
