import { Client } from 'appwrite'
import { Client as ClientAdmin } from 'node-appwrite'
import { getSessionFromCookie } from './auth/account'
import setAdmin from './set/setAdmin'
import setClient from './set/setClient'
import type { Types } from './types/Types'

export const connections = (
	clientClient: Client,
	clientAdmin: ClientAdmin,
	hostname: string,
	apiKey?: string | undefined,
) => {
	const { endpoint, project } = clientClient.config
	return {
		setSession: (session: string) => {
			clientClient.headers['X-Fallback-Cookies'] = JSON.stringify({
				[`a_session_${clientClient.config.project}`]: session,
			})
			return setClient(clientClient, hostname)
		},
		setCookie: (cookies: Types.Cookie[]) => {
			const session = getSessionFromCookie(project, cookies)
			if (!session) throw new Error('No session was found')
			return connections(clientClient, clientAdmin, hostname).setSession(session)
		},

		none: () => {
			return setClient(clientClient, hostname)
		},

		setAdmin: () => {
			if (!apiKey) throw new Error('Api key is not provided')
			return setAdmin(clientAdmin.setKey(apiKey))
		},
	}
}

const setProject = (params: {
	projectId: string
	endpoint: string
	apiKey?: string
	hostname: string
}) => {
	const clientClient = new Client()
		.setEndpoint(params.endpoint)
		.setProject(params.projectId)
	const clientAdmin = new ClientAdmin()
		.setEndpoint(params.endpoint)
		.setProject(params.projectId)

	return connections(clientClient, clientAdmin, params.hostname, params.apiKey)
}

export { setProject }
