import { Client, Users, Teams, Functions, Graphql, Health, Locale, Avatars } from 'node-appwrite'
import AdminCollection from '../databases/AdminCollection'

export default (client: Client) => {
	const users = new Users(client)
	const avatars = new Avatars(client)
	const functions = new Functions(client)
	const graphql = new Graphql(client)
	const health = new Health(client)
	const locale = new Locale(client)
	const Collection = AdminCollection(client)
	return {
		users,
		avatars,
		functions,
		graphql,
		health,
		locale,
		Collection,
	}
}
