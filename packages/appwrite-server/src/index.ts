import { type Models, Permission } from 'node-appwrite'
import permissions from './permissions'
import { Query } from 'node-appwrite'
import Connection from './connections'
import { adminAppwriteClient } from './connections'

const connections = new Connection()
export default connections

export { permissions, Models, Permission, Query, adminAppwriteClient }
