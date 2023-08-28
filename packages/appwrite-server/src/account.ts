//@ts-ignore
import * as setCookie from 'set-cookie-parser'

import { Client as ClientServer, Account as AccountServer } from 'node-appwrite'
import { Client as ClientBrowser, Account as AccountBrowser } from 'appwrite'

export class Account extends AccountServer {
	constructor(public client: ClientServer) {
		super(client)
	}
	async createSession(callbackFetch: () => Promise<Response>) {
		try {
			const response = await callbackFetch()

			console.log(response)

			const json = await response.json()

			if (json.code >= 400) throw new Error('wrong email or password at appwrite-server account/createSession')

			const SSRHostName = process.env.HOSTNAME === 'localhost' ? 'localhost' : `.${process.env.SSR_HOSTNAME}`

			const cookiesStr = (response.headers.get('set-cookie') ?? '').split(SSRHostName).join(SSRHostName)

			const cookiesArray = setCookie.splitCookiesString(cookiesStr)
			//@ts-ignore
			const cookiesParsed = cookiesArray.map((cookie) => setCookie.parseString(cookie))

			return {
				sessionToken: {
					name: cookiesParsed[0].name,
					value: cookiesParsed[0].value,
					domain: SSRHostName,
					secure: false, //cookiesParsed[0].secure,
					sameSite: cookiesParsed[0].sameSite as any,
					path: '/',
					maxAge: cookiesParsed[0].maxAge,
					httpOnly: cookiesParsed[0].httpOnly,
					expires: cookiesParsed[0].expires,
				},

				sessionLegacyToken: {
					name: cookiesParsed[1].name,
					value: cookiesParsed[1].value,
					domain: SSRHostName,
					secure: false, // cookiesParsed[1].secure,
					sameSite: cookiesParsed[1].sameSite as any,
					path: '/',
					maxAge: cookiesParsed[1].maxAge,
					httpOnly: cookiesParsed[1].httpOnly,
					expires: cookiesParsed[1].expires,
				},
			}
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async createJwtWithSession(session: string) {
		if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID) throw TypeError('project id or peoject endpoint is not set')
		const clientBrowser = new ClientBrowser().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID)
		const authCookies: any = {}
		authCookies['a_session_' + process.env.APPWRITE_PROJECT_ID] = session
		clientBrowser.headers['X-Fallback-Cookies'] = authCookies
		clientBrowser.headers['Cookie'] = `a_session_console=${session}; a_session_experiences=${session}`

		const account = new AccountBrowser(clientBrowser)

		const jwt = (await account.createJWT()).jwt

		return { jwt }
	}
	//async deleteSession(sessionId: string) {}
}
