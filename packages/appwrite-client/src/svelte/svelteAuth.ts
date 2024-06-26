import { Account, ID } from 'appwrite'
import { writable } from 'svelte/store'

import type { Models } from 'appwrite'
import type { Writable } from 'svelte/store'
import { Preferences } from '@app/ts-types'
import lodash from 'lodash'

export default <Preferences extends Record<string, any>>(account: Account) => {
	const client = account.client

	return class Auth extends Account {
		public userStore: Writable<Models.User<Preferences> | null> = writable(null)
		public subscribe = this.userStore.subscribe

		public isLoadingStore = writable(true)
		public isLoading = { subscribe: this.isLoadingStore.subscribe }
		public userId: string = Math.random().toString().substring(2, 7)

		constructor() {
			super(client)

			try {
				this.__get().then(() => this.isLoadingStore.set(false))

				client.subscribe('account', (response) => {
					if (response.events.includes('users.*.update')) {
						return this.__get()
					}

					if (response.events.includes('users.*.delete')) {
						this.deleteSessions()
						return this.userStore.set(null)
					}
				})
			} catch (error) {}
		}

		async createEmailSession(email: string, password: string) {
			const session = await account.createEmailSession(email, password)
			await this.__get()
			return session
		}

		async createPhoneSession(phone: string, userId = this.userId) {
			const token = await account.createPhoneSession(userId, phone)
			return token
		}
		async updatePhoneSession(secret: string, userId = this.userId) {
			const session = await account.updatePhoneSession(userId, secret)
			await this.__get()
			return session
		}

		async deleteSession(sessionId: string) {
			const session = await account.deleteSession(sessionId)
			this.userStore.set(null)
			return session
		}

		async deleteSessions() {
			const session = await account.deleteSessions()
			this.userStore.set(null)
			return session
		}

		async createAccount(email: string, password: string, name: string) {
			return await account.create(ID.unique(), email, password, name)
		}

		async addPreferences(prefs: Partial<Preferences>) {
			const currentPrefs = await account.getPrefs<Preferences>()
			return await account.updatePrefs(lodash.merge(currentPrefs, prefs))
		}

		async __get() {
			try {
				const user = await account.get<Preferences>()

				this.userStore.set(user)

				return user
			} catch (e) {
				this.userStore.set(null)
				return null
			}
		}
		getUser() {
			return this.__get()
		}
		getPreferences() {
			return account.getPrefs<Preferences>()
		}
	}
}
