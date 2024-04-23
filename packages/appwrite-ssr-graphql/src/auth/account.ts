import { Account, Client } from 'appwrite'
import * as setCookie from 'set-cookie-parser'
import { z } from 'zod'
import { Types } from '../types/Types'

const userHasCookies = (cookies: {}): cookies is Types.Cookie[] =>
	Object.entries(cookies).length !== 0

export const getSessionFromCookie = (
	projectId: string,
	cookies: Types.Cookie[] | {}[],
): string | undefined => {
	if (!userHasCookies(cookies)) return undefined

	const sessionNames = [
		'a_session_' + projectId.toLowerCase(),
		'a_session_' + projectId.toLowerCase() + '_legacy',
	]

	const appwriteCookies: Types.Cookie[] | undefined[] = cookies
		.filter((cookie) => sessionNames.includes(cookie.name))
		.sort((a, b) => a.name.length - b.name.length) as Types.Cookie[] | undefined[]

	const session = appwriteCookies[0] // [0] is a_session_...... and [1] is a_session_........_legacy, because of sorting

	if (!session) throw new Error('No cookies provided')
	return session.value
}

// ----------------------------------------------------------------

export default (client: Client, hostname: string) => {
	const sessionNames = [
		'a_session_' + client.config.project.toLowerCase(),
		'a_session_' + client.config.project.toLowerCase() + '_legacy',
	] as const

	const SSRHostName = hostname === 'localhost' ? 'localhost' : `.${hostname}`

	return class Auth<Preferences extends object> extends Account {
		constructor() {
			super(client)
		}

		loginViaEmail(email: string, password: string) {
			if (!client.config.endpoint || !client.config.project)
				throw new Error('Project or endpoint is not set')
			const promise = fetch(`${client.config.endpoint}/account/sessions/email`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-appwrite-project': client.config.project,
				} as HeadersInit,
				body: JSON.stringify({
					email,
					password,
				}),
			})

			return this.createSession(() => promise)
		}

		createAnonymousSessionViaSSR() {
			if (!client.config.endpoint || !client.config.project)
				throw new Error('Project or endpoint is not set')
			const promise = fetch(`${client.config.endpoint}/account/sessions/anonymous`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-appwrite-project': client.config.project,
				} as HeadersInit,
			})

			return this.createSession(() => promise)
		}

		async createSession(callbackFetch: () => Promise<Response>) {
			try {
				const response = await callbackFetch()

				const json = await response.json()

				const { status } = z.object({ status: z.number() }).parse(response)

				if (status === 429) throw new Error('429')
				else if (status >= 401) throw new Error('400')

				const cookiesStr = (response.headers.get('set-cookie') ?? '')
					.split(SSRHostName)
					.join(SSRHostName)

				const cookiesArray = setCookie.splitCookiesString(cookiesStr)

				const cookiesParsed = cookiesArray.map((cookie) => setCookie.parseString(cookie))

				const session = cookiesParsed[0]
				const sessionLegacy = cookiesParsed[1]
				if (!session) throw new Error('session was not created/found')

				return {
					sessionToken: {
						...session,
						name: sessionNames[0],
						domain: SSRHostName,
						path: '/',
					},
					sessionLegacyToken: {
						...sessionLegacy,
						name: sessionNames[1],
						domain: SSRHostName,
						path: '/',
					},
				}
			} catch (error) {
				throw error
			}
		}
		logOut() {
			return {
				sessionToken: {
					value: '',
					name: sessionNames[0],
					domain: SSRHostName,
					path: '/',
				},
				sessionLegacyToken: {
					value: '',
					name: sessionNames[1],
					domain: SSRHostName,
					path: '/',
				},
				sessionNames: { token: sessionNames[0], legacyToken: sessionNames[1] },
			} as const
		}
		oauth2Login(
			url: URL,
			params = {
				domain: hostname,
				secure: true,
				path: '/',
				httpOnly: true,
			},
		) {
			// do this only on path: /auth/oauth2/success (strictly)
			const urlParams = new URLSearchParams(url.searchParams)
			const secret = urlParams.get('secret')
			if (!secret) throw new Error(`Invalid secret`)
			return {
				sessionToken: {
					name: sessionNames[0],
					value: secret,
					...params,
				},
				sessionLegacyToken: {
					name: sessionNames[0],
					value: secret,
					...params,
				},
			}
		}
		updatePreferences(prefs: Preferences) {
			return this.updatePrefs<Preferences>(prefs)
		}
	}
}
