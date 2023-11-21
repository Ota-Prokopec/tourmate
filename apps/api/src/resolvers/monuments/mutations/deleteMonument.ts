import { mutationField, stringArg } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'
import cloudinary from '@app/cloudinary-server'

//TODO: delete the question and answer

export default mutationField('deleteMonument', {
	type: 'Boolean',
	args: { monumentId: stringArg() },
	resolve: async (s_, args, ctx) => {
		const { collections } = ctx.appwrite

		const monument = await collections.monument.getDocument([
			Queries.monument.equal('$id', args.monumentId),
		])

		if (!monument) throw new Error('This monument does not exist')

		// delete monument-like
		const monumentLikesDeleteQueries = Queries.monumentLike.equal(
			'monumentId',
			args.monumentId,
		)
		const deleteLikesPromise = collections.monumentLike.deleteDocuments([
			monumentLikesDeleteQueries,
		])

		// delete monument picture from cloudinary
		let pictureDeletePromise: Promise<any> | undefined
		if (monument?.pictureURL) {
			const pictureFile = cloudinary.monuments.getFileNameFromUrl(monument.pictureURL)
			pictureDeletePromise = cloudinary.monuments.deleteFiles(pictureFile)
		}

		// delete place-detail of monument
		const placeDetailDeletePromise = collections.placeDetail.deleteDocument(
			monument.placeDetailId,
		)

		// delete monument it self
		const monumentDeletePromise = collections.monument.deleteDocument(monument?._id)

		// all into promise
		await Promise.all([
			deleteLikesPromise,
			pictureDeletePromise,
			monumentDeletePromise,
			placeDetailDeletePromise,
		])

		return true
	},
})
