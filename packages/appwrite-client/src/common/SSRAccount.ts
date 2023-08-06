import { OAuth2Providers } from '@app/ts-types'
import { browserStorage, post } from '@app/utils'
import { Account, Client } from 'appwrite'
import Cookies from 'js-cookie'

export class SSRAccount {
	constructor(public client: Client, public projectId: string) {}
	async createEmailSession(email: string, password: string) {
		const session: string | { message: string } = await post('/api/authorization/createEmailSession', { email, password })
		console.log(session)
		if (typeof session === 'object') throw new Error('email or password are wrong')
		this.setSessionIntoLocalStorage(session)
		this.setHeaderInAppwriteClient(session)
	}

	setSessionIntoLocalStorage(appwriteSession: string) {
		browserStorage.cookieFallback = {
			[`a_session_${this.projectId}`]: appwriteSession,
		}
	}
	setHeaderInAppwriteClient(fallbackCookies: string) {
		this.client.headers['X-Fallback-Cookies'] = fallbackCookies
	}
	setSessionIntoCookies(session: string) {
		Cookies.set(`a_session_${this.projectId}`, session)
		Cookies.set(`a_session_${this.projectId}_legacy`, session)
	}
}
