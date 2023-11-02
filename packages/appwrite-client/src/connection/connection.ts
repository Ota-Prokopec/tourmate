import {
	Client,
	Teams,
	Functions,
	Locale,
	Avatars,
	Graphql,
	Account,
	Role,
	Permission,
	ID,
} from 'appwrite'
import { createAuthDispatcher } from '../svelte/main'
import { Query } from 'appwrite'
import database from '../database/database'

export default (client: Client) => {
	const teams = new Teams(client)
	const functions = new Functions(client)
	const locale = new Locale(client)
	const avatars = new Avatars(client)
	const graphql = new Graphql(client)
	const account = new Account(client)
	const Auth = createAuthDispatcher(account)
	const Collection = database(client)
	const user = new Auth()
	const isLoading = user.isLoading

	return {
		client,
		teams,
		functions,
		locale,
		avatars,
		graphql,
		account,
		database,
		user,
		isLoading,
		Collection,
		Query,
		Role,
		Permission,
		ID,
	}
}
