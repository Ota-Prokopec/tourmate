import { Request, Response } from 'express'
import appwriteSSR, { Types, appwrite } from '@app/appwrite-ssr'
import { Client, Models } from 'appwrite'
import type { Preferences } from '@app/ts-types'
import { adminAppwriteClient } from '@app/appwrite-server'

export const context = async ({ req, res }: { res: Response; req: Request }) => {
	try {
		const cookies: Types.Cookie[] = Object.entries(req.cookies as Record<string, string>).map(([key, value]) => ({
			name: key,
			value: value,
		}))

		console.log(cookies)

		let appwriteClient: appwrite.Client
		let appwriteUser: Models.User<Preferences> | undefined = undefined

		try {
			const { client, account } = appwriteSSR.setCookie(cookies)
			appwriteClient = client
			appwriteUser = await account.get<Preferences>()
		} catch (error) {
			const { client } = appwriteSSR.none()
			appwriteClient = client
		}

		return {
			req,
			res,
			isAuthed: typeof appwriteUser !== 'undefined',
			appwriteClient,
			appwriteAdminClient: adminAppwriteClient,
			user: appwriteUser,
		}
	} catch (error) {
		console.log(error)
	}
}

export type Context = NonNullable<Awaited<ReturnType<typeof context>>>
