import { setProject } from './connection'
import type { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import * as appwrite from 'appwrite'
import Query from './queries/query'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from './databases/transformer'
import * as permissions from '@app/appwrite-permissions'
import { appwriteGraphqlKeys, appwriteKeys } from './databases/appwriteKeys'
export default { setProject }
export {
	permissions,
	getSessionFromCookie,
	appwrite,
	Query,
	transformAppwriteDocumentsIntoGraphqlDocuments,
}
export { setProject, appwriteGraphqlKeys, appwriteKeys }
export type { Types }
