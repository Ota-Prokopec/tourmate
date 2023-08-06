import { string, z, number, boolean } from 'zod'
import { appWriteDocumentOptionalZod, appWriteDocumentZod, appwriteDocumentForOmit } from './Document'

//////// UserInfo ///////////
export const userInfoZod = z
	.object({
		userId: string(),
		myId: string(),
		username: string(),
	})
	.extend(appWriteDocumentOptionalZod)
export const userInfoDocumentZod = userInfoZod.extend(appWriteDocumentZod)
export const userInfoDocumentCreateZod = userInfoDocumentZod.omit({
	...appwriteDocumentForOmit,
})
