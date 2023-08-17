import { z } from 'zod'
import { appWriteDocumentZod, appwriteDocumentForOmit } from './Document'
import { base64TypeZod } from './zodTypes'
import { Base64 } from './TsTypes'

export const locationZod = z.tuple([z.number(), z.number()])
export type Location = [number, number]

export const experienceZod = z.object({
	userId: z.string(),
	imgSrc: z.union([z.string(), z.string().url(), base64TypeZod]),
	location: z.tuple([z.number(), z.number()]),
})
export const experienceDocumentZod = z
	.object({
		userId: z.string(),
		imgSrc: z.union([z.string(), z.string().url(), base64TypeZod]),
		latitude: z.number(),
		longitude: z.number(),
	})
	.merge(appWriteDocumentZod)
export const experienceDocumentCreateZod = experienceDocumentZod.omit(appwriteDocumentForOmit)

export const loadedExperienceZod = experienceZod.merge(appWriteDocumentZod)

export const monumentZod = z.object({
	about: z.string().max(500).optional(),
	creatorUserId: z.string().max(255),
	location: locationZod,
	name: z.string().max(255),
	pictureURL: z.string().url().optional(),
})
export const monumentDocumentZod = z
	.object({
		about: z.string().max(500).optional(),
		creatorUserId: z.string().max(255),
		latitude: z.number(),
		longitude: z.number(),
		name: z.string().max(255),
		pictureURL: z.string().url().optional(),
	})
	.merge(appWriteDocumentZod)
export const monumentDocumentCreateZod = monumentDocumentZod.omit(appwriteDocumentForOmit)

export type ExperienceDocument = z.infer<typeof experienceDocumentZod>
export type Experience = z.infer<typeof experienceZod> & { imgSrc: string | Base64 }
export type ExperienceDocumentCreate = z.infer<typeof experienceDocumentCreateZod>
export type LoadedExperience = z.infer<typeof loadedExperienceZod>
export type MonumentDocument = z.infer<typeof monumentDocumentZod>
export type Monument = z.infer<typeof monumentZod>
export type MonumentDocumentCreate = z.infer<typeof monumentDocumentCreateZod>
