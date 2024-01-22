import cloudinary from '@app/cloudinary-server'
import { isBase64 } from '@app/utils'
import { ApolloError } from 'apollo-server-express'
import { queryField, stringArg } from 'nexus'
import { Query } from 'node-appwrite'

export default queryField('updateProfilePicture', {
	args: { picture: stringArg() },
	type: 'Account',
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user)) throw new Error('user is not authed')
		if (!isBase64(args.picture)) throw new TypeError('picture is not a base64 string')
		const { collections } = ctx.appwrite

		const userInfo = await collections.userInfo.getDocument([
			Query.equal('userId', ctx.user.$id),
		])
		if (!userInfo)
			throw new ApolloError('userInfo is not defined for updateProfilePicture', '500')

		if (userInfo?.profilePictureURL) {
			// * delete his old picture
			const file = cloudinary.profilePictures.getFileNameFromUrl(
				userInfo.profilePictureURL,
			)
			await cloudinary.profilePictures.deleteFiles(file)
		}

		const file = await cloudinary.profilePictures.uploadBase64(args.picture)

		await collections.userInfo.updateDocument(userInfo._id, {
			profilePictureURL: file.secure_url,
		})

		return {
			_createdAt: userInfo._createdAt,
			_updatedAt: userInfo._updatedAt,
			_collectionId: userInfo._collectionId,
			_documentId: userInfo._id,
			_permissions: userInfo._permissions,
			_databaseId: userInfo._databaseId,
			emailVerification: ctx.user.emailVerification,
			myId: userInfo.myId,
			prefs: ctx.user.prefs,
			status: ctx.user.status,
			username: userInfo.username,
			phoneVerification: ctx.user.phoneVerification,
			userId: userInfo.userId,
			profilePictureURL: file.url,
		}
	},
})
