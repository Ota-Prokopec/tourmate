import { connections, setProject } from './connections'
import * as permissions from '@app/appwrite-permissions'
import type { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import * as appwrite from 'appwrite'
import Query from './queries/query'
export default { ...connections, setProject }
export { permissions, getSessionFromCookie, appwrite, Query }
export type { Types }
