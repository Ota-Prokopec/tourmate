import { Request, Response } from 'express'
import { Models } from 'appwrite'
import type { Base64, Preferences } from '@app/ts-types'
import appwriteConnections from './lib/appwrite/appwrite'
import { Types, getSessionFromCookie } from '@app/appwrite-ssr-graphql'

export const context = async ({ req, res }: { res: Response; req: Request }) => {
	try {
		const cookies: Types.Cookie[] = Object.entries(
			req.cookies as Record<string, string>,
		).map(([key, value]) => ({
			name: key,
			value: value,
		}))

		let user: Models.User<Preferences> | null = null
		let appwrite: ReturnType<typeof appwriteConnections.setCookie>

		const sessionForAndroid = getSessionFromCookie(
			process.env.APPWRITE_PROJECT_ID,
			cookies,
		)
		const sessionForIos = req.headers ? req.headers.authorization : undefined
		console.log(sessionForIos)

		const session = sessionForAndroid ?? sessionForIos
		try {
			if (!session) throw new Error('User is not authenticated')
			appwrite = appwriteConnections.setSession(session)

			/*appwrite.account.updatePreferences({
				colorTheme: 'dark',
				language: 'en',
				mapRange: 3000,
				termsAccepted: true,
			})*/

			user = await appwrite.account.get()

			// appwrite.account.updatePrefs<Preferences>({
			// 	mapRange: 400,
			// 	termsAccepted: true,
			// })
		} catch (error) {
			appwrite = appwriteConnections.setNone()
			//user is equal to null
		}

		return {
			req,
			res,
			isAuthed: (ctxUser: typeof user | null): ctxUser is NonNullable<typeof user> =>
				ctxUser !== null,
			user: user,
			appwrite: appwrite,
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}

export type Context = NonNullable<Awaited<ReturnType<typeof context>>>
