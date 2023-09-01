import { Account, Client, ID } from 'appwrite'
import * as setCookie from 'set-cookie-parser'

export const getSessionFromCookie = (
	cookies: {
		name: string
		value: string
	}[],
) => {
	const sessionNames = [
		'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase(),
		'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase() + '_legacy',
	]
	const appwriteCookies = cookies.filter((cookie) => sessionNames.includes(cookie.name)).sort((a, b) => a.name.length - b.name.length)

	const session = appwriteCookies[0] ?? appwriteCookies[1] // [0] is a_session_...... and [1] is a_session_........_legacy, because of sorting
	return session.value
}

export default (client: Client) => {
	const account = new Account(client)
	return class Auth extends Account {
		constructor() {
			super(client)
		}

		loginViaEmail(email: string, password: string) {
			const promise = fetch(`${process.env.APPWRITE_ENDPOINT}/account/sessions/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-appwrite-project': process.env.APPWRITE_PROJECT_ID,
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
			return this.createSession(() => promise)
		}

		async createSession(callbackFetch: () => Promise<Response>) {
			try {
				const response = await callbackFetch()

				const json = await response.json()

				if (json.code >= 400) throw new Error('create session error')

				const SSRHostName = process.env.HOSTNAME === 'localhost' ? 'localhost' : `.${process.env.SSR_HOSTNAME}`

				const cookiesStr = (response.headers.get('set-cookie') ?? '').split(SSRHostName).join(SSRHostName)

				const cookiesArray = setCookie.splitCookiesString(cookiesStr)

				const cookiesParsed = cookiesArray.map((cookie) => setCookie.parseString(cookie))

				const session = cookiesParsed[0]
				const sessionLegacy = cookiesParsed[1]

				return {
					sessionToken: {
						...session,
						domain: SSRHostName,
						path: '/',
					},
					sessionLegacyToken: {
						...sessionLegacy,
						domain: SSRHostName,
						path: '/',
					},
				}
			} catch (error) {
				throw error
			}
		}
	}
}
