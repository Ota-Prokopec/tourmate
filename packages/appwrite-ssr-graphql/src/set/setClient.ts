import { Avatars, Client, Databases, Functions, Graphql, Teams } from 'appwrite'
import account_ from '../auth/account'
import databse_ from '../databases/ClientCollection'
import storage_ from '../storage/storage'
import Locale from '../locale/locale'

export default (client: Client, hostname: string) => {
	const Auth = account_(client, hostname)
	const Collection = databse_(client)
	const Bucket = storage_(client)
	const teams = new Teams(client)
	const functions = new Functions(client)
	const locale = new Locale(client)
	const avatars = new Avatars(client)
	const graphql = new Graphql(client)
	const databases = new Databases(client)

	return {
		Auth,
		Collection,
		Bucket,
		teams,
		functions,
		locale,
		avatars,
		graphql,
		databases,
		client,
	}
}
