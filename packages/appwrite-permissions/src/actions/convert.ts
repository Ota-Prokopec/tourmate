type Functions = 'delete' | 'read' | 'update' | 'create' | 'write'
type UserOrTeam = 'users' | 'teams'
export const convert = (permissions: string[]) => {
	if (typeof permissions === 'object') permissions = Object.values(permissions) //because appwrite sometimes gives you [] permissions and sometimes {}
	const arr = permissions?.map((permission): { [key: string]: string } => {
		const propetries = permission.split('(').join(')').split(')')
		const key = propetries[0]
		const value = propetries[1]
		if (!key || !value) throw new Error('Invalid permissions array')
		return {
			[key]: JSON.parse(value) as string,
		}
	})
	const object: {
		delete: { users: string[]; teams: string[] }
		read: { users: string[]; teams: string[] }
		update: { users: string[]; teams: string[] }
		create: { users: string[]; teams: string[] }
		write: { users: string[]; teams: string[] }
	} = {
		delete: { users: [], teams: [] },
		read: { users: [], teams: [] },
		update: { users: [], teams: [] },
		create: { users: [], teams: [] },
		write: { users: [], teams: [] },
	}
	arr?.forEach((item) => {
		const [key, value] = Object.entries(item)[0] as [Functions, string]
		const role: UserOrTeam = `${value.split(':')[0]}s` as UserOrTeam
		const ID = value.split(':')[1]
		if (!object[key][role]) object[key][role] = []
		object[key][role] = [...object[key][role], ID || 'any-has-value-empty']
	})
	return object
}
