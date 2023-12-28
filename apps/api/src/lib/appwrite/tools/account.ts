import type { Types } from '@app/appwrite-ssr-graphql'
import { Preferences } from '@app/ts-types'

type AppwriteSSRReturnTypeClient = ReturnType<Types.AppwriteSSR['none']>

export const getAccount = (Auth: AppwriteSSRReturnTypeClient['Auth']) => {
	return new Auth<Preferences>()
}
