import { connections, setProject, set } from './connections'
import permissions from '@app/appwrite-permissions'
import { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import appwrite from 'appwrite'
export default { ...connections, setProject, ...set() }
export { permissions, getSessionFromCookie, appwrite }
export type { Types }
