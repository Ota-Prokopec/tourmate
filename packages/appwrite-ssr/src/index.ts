import { connections, setProject } from './connections'
import permissions from './permissions/permissions'
import { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import appwrite from 'appwrite'
export default { ...connections, setProject }
export { permissions, getSessionFromCookie, appwrite }
export type { Types }
