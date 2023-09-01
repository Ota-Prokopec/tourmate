import { string, z, number, boolean } from 'zod'
import { appWriteDocumentOptionalZod, appWriteDocumentZod, appwriteDocumentForOmit } from './Document'
import { Models } from 'node-appwrite'
import type { Location } from './Experience'

//////// UserInfo ///////////
export const userInfoZod = z.object({
	userId: string(),
	myId: string(),
	username: string(),
	profilePictureURL: string().url().optional(),
})

export const tokenZod = z.object({
	userId: string(),
	fcmFirebaseToken: string().optional(),
})
export const userInfoDocumentZod = userInfoZod.merge(appWriteDocumentZod)
export const userInfoDocumentCreateZod = userInfoDocumentZod.omit({
	...appwriteDocumentForOmit,
})

export type Preferences = { termsAccepted: boolean; location: Location }

export type UserInfo = z.infer<typeof userInfoZod>
export type UserInfoDocument = z.infer<typeof userInfoDocumentZod>
export type UserInfoDocumentCreate = z.infer<typeof userInfoDocumentCreateZod>

export const tokenDocumentZod = tokenZod.merge(appWriteDocumentZod)
export const tokenDocumentCreateZod = tokenZod

export type Token = z.infer<typeof tokenZod>
export type TokenDocument = z.infer<typeof tokenDocumentZod>
export type TokenDocumentCreate = z.infer<typeof tokenDocumentCreateZod>
