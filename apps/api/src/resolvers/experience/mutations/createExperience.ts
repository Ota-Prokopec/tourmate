import { arg, mutationField } from 'nexus'
import createExperienceInput from '../schema/createExperienceInput'
import { isBase64 } from '@app/utils'
import * as permissions from '@app/appwrite-permissions'
import { ApolloError } from 'apollo-server-express'
import { transformExperienceDocumentsIntoExperience } from '@app/experience-database-server-graphql'
import { Models } from 'appwrite'
import { numberTimingCoords } from '@app/experience-settings'

export default mutationField('createExperience', {
	args: { input: arg({ type: createExperienceInput }) },
	type: 'Experience',
	resolve: async (s, args, ctx) => {
		const { collections, buckets } = ctx.appwrite

		if (!isBase64(args.input.picture)) throw new Error('input.imgSrc musts be a valid base64 string')
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('user is not authed')

		const document = await buckets.experiencesPictures
			.createFile(args.input.picture, permissions.owner(ctx.user.$id))
			.then(async (file: Models.File) => {
				if (!ctx.isAuthed(ctx.user?.$id)) throw new ApolloError('User is not Authed', '403')
				const url = buckets.experiencesPictures.getFileURL(file.$id)
				return await collections.experience.createDocument({
					userId: ctx.user.$id,
					imgSrc: url,
					latitude: Math.round(args.input.location[0] * numberTimingCoords),
					longitude: Math.round(args.input.location[1] * numberTimingCoords),
				})
			})
		return transformExperienceDocumentsIntoExperience(document)[0]
	},
})
