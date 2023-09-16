import { Permission, Role } from 'appwrite'

export const owner = (...userIds: string[]) =>
	userIds.flatMap((userId) => [
		Permission.read(Role.user(userId)),
		Permission.write(Role.user(userId)),
		Permission.update(Role.user(userId)),
		Permission.delete(Role.user(userId)),
	])

export const read = (...userIds: string[]) => userIds.map((userId) => Permission.read(Role.user(userId)))
export const readAny = () => [Permission.read(Role.any())]
