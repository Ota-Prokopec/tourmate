import { Request, Response } from 'express'
import { Models } from 'appwrite'
import type { Preferences } from '@app/ts-types'
import appwriteConnections from './lib/appwrite/appwrite'
import { Types } from '@app/appwrite-ssr-graphql'

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

		console.log(cookies)

		try {
			appwrite = appwriteConnections.setCookie(cookies)

			user = await appwrite.account.get<Preferences>()

			// appwrite.account.updatePrefs<Preferences>({
			// 	mapRange: 400,
			// 	termsAccepted: true,
			// })
		} catch (error) {
			console.log(error)

			appwrite = appwriteConnections.setNone()
			//user is equal to null
		}

		console.log(user)

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
