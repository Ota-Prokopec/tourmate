import { RequestConfig } from 'graphql-request/build/esm/types'

const url = `${process.env.SERVER_HOSTNAME}:4444/graphql`

export default [
	url,
	{
		credentials: 'include',
	} as RequestConfig,
] as const
