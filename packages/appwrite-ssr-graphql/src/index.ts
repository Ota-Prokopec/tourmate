import { connections, setProject, set } from './connections'
import { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import appwrite from 'appwrite'
export default { ...connections, setProject, ...set() }
export { getSessionFromCookie, appwrite }
export type { Types }
