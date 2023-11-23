import { mutationField, stringArg } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'
import cloudinary from '@app/cloudinary-server'

//TODO: delete the users answers on question
//FIXME: when i delete a monument where experiences are, experiences will become free-experiences

export default mutationField('deleteMonument', {
	type: 'Boolean',
	args: { monumentId: stringArg() },
	resolve: async (s_, args, ctx) => {
		const { collections } = ctx.appwrite

		const monument = await collections.monument.getDocument([
			Queries.monument.equal('$id', args.monumentId),
		])
		const question = monument?.questionId
			? await collections.question.getDocument(monument.questionId)
			: null

		if (!monument) throw new Error('This monument does not exist')

		// delete monument-like
		const monumentLikesDeleteQueries = Queries.monumentLike.equal(
			'monumentId',
			args.monumentId,
		)
		const deleteLikesPromise = collections.monumentLike.deleteDocuments([
			monumentLikesDeleteQueries,
		])

		const deleteQuestionAnswerPromise = question
			? question.answerType === 'text'
				? collections.answerTypeText.deleteDocument(question.answerId)
				: question.answerType === 'number'
				? collections.answerTypeNumber.deleteDocument(question.answerId)
				: collections.answerTypeRadio.deleteDocument(question.answerId)
			: null

		const deleteQuestionPromise = question
			? collections.question.deleteDocument(question?._id)
			: null

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
			deleteQuestionAnswerPromise,
			deleteQuestionPromise,
		])

		return true
	},
})
