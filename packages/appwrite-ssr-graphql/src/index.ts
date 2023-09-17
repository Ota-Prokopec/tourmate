import { connections, setProject, set } from './connections'
import { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import * as appwrite from 'appwrite'
export default { ...connections, setProject }
export { getSessionFromCookie, appwrite }
export type { Types }
