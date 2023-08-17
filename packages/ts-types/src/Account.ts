import { string, z, number, boolean } from 'zod'
import { appWriteDocumentOptionalZod, appWriteDocumentZod, appwriteDocumentForOmit } from './Document'

//////// UserInfo ///////////
export const userInfoZod = z.object({
	userId: string(),
	myId: string(),
	username: string(),
	profilePictureURL: string().url().optional(),
})
export const userInfoDocumentZod = userInfoZod.merge(appWriteDocumentZod)
export const userInfoDocumentCreateZod = userInfoDocumentZod.omit({
	...appwriteDocumentForOmit,
})
