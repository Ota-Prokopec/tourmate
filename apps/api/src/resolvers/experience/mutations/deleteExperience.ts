import { mutationField, stringArg } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'
import cloudinary from '@app/cloudinary-server'

export default mutationField('deleteExperience', {
	type: 'Boolean',
	args: { experienceId: stringArg() },
	resolve: async (s_, args, ctx) => {
		const { collections } = ctx.appwrite

		const experience = await collections.experience.getDocument([
			Queries.experience.equal('$id', args.experienceId),
		])

		if (!experience) throw new Error('This experience does not exist')

		// delete experience-likes
		const experienceLikesDeleteQueries = Queries.experienceLike.equal(
			'experienceId',
			args.experienceId,
		)
		const deleteLikesPromise = collections.experienceLike.deleteDocuments([
			experienceLikesDeleteQueries,
		])

		// delete monument picture from cloudinary
		let pictureDeletePromise: Promise<any> | undefined

		//only if the experience includes picture
		if (experience.pictureUrl) {
			const pictureFile = cloudinary.experiences.getFileNameFromUrl(experience.pictureUrl)
			pictureDeletePromise = cloudinary.experiences.deleteFiles(pictureFile)
		}

		// delete experience it self
		const experienceDeletePromise = collections.experience.deleteDocument(experience._id)

		// all into promise
		await Promise.all([deleteLikesPromise, pictureDeletePromise, experienceDeletePromise])

		return true
	},
})
