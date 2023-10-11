import { Account, Client, ID } from 'appwrite'
import * as setCookie from 'set-cookie-parser'
import { Types } from '../types/Types'
import { envs } from '../env'

const userHasCookies = (cookies: {}): cookies is Types.Cookie[] => Object.entries(cookies).length !== 0

export const getSessionFromCookie = (cookies: Types.Cookie[] | {}[]): string | undefined => {
	if (!envs.projectEndPoint || !envs.projectId) throw new Error('Project or endpoint is not set')
	if (!userHasCookies(cookies)) throw new Error('No cookies provided')

	const sessionNames = ['a_session_' + envs.projectId?.toLowerCase(), 'a_session_' + envs.projectId?.toLowerCase() + '_legacy']

	const appwriteCookies: Types.Cookie[] | undefined[] = cookies
		.filter((cookie) => sessionNames.includes(cookie.name))
		.sort((a, b) => a.name.length - b.name.length) as Types.Cookie[] | undefined[]

	const session = appwriteCookies[0] // [0] is a_session_...... and [1] is a_session_........_legacy, because of sorting

	if (!session) throw new Error('User does not have session cookie')
	return session.value
}

export default (client: Client) => {
	return class Auth extends Account {
		constructor() {
			super(client)
		}

		loginViaEmail(email: string, password: string) {
			if (!envs.projectEndPoint || !envs.projectId) throw new Error('Project or endpoint is not set')
			const promise = fetch(`${envs.projectEndPoint}/account/sessions/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-appwrite-project': envs.projectId,
				} as HeadersInit,
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

				const json = (await response.json()) as { code: number; message: string }

				if (json.code >= 400) throw new Error(json.message)

				const SSRHostName = envs.hostname === 'localhost' ? 'localhost' : `.${envs.hostname}`

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
