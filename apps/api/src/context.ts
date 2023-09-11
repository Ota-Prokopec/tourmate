import { Request, Response } from 'express'
import { Types } from '@app/appwrite-ssr-experiences-graphql'
import { Models } from 'appwrite'
import type { Preferences } from '@app/ts-types'
import appwriteConnections from '@app/appwrite-ssr-experiences-graphql'

export const context = async ({ req, res }: { res: Response; req: Request }) => {
	try {
		const cookies: Types.Cookie[] = Object.entries(req.cookies as Record<string, string>).map(([key, value]) => ({
			name: key,
			value: value,
		}))

		let user: Models.User<Preferences> | null = null
		let appwrite: ReturnType<typeof appwriteConnections.setCookie>

		try {
			appwrite = appwriteConnections.setCookie(cookies)
			user = await appwrite.account.get<Preferences>()
		} catch (error) {
			appwrite = appwriteConnections.setNone()
			//user is equal to null
		}

		return {
			req,
			res,
			isAuthed: (ctxUser: unknown): ctxUser is NonNullable<typeof user> => ctxUser !== null,
			user: user,
			appwrite: appwrite,
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}

export type Context = NonNullable<Awaited<ReturnType<typeof context>>>
