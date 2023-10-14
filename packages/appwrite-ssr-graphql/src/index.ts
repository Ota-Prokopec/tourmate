import { setProject } from './connection'
import * as permissions from './permissions/permissions'
import type { Types } from './types/Types'
import { getSessionFromCookie } from './auth/account'
import * as appwrite from 'appwrite'

import Query from './queries/query'
export default { setProject }
export { permissions, getSessionFromCookie, appwrite, Query }

export type { Types }
