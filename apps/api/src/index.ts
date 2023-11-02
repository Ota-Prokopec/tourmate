import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import { context } from './context'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const server = new ApolloServer({ schema, context: context })

const app = express()

const start = async () => {
	await server.start()
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: false,
		bodyParserConfig: { limit: '50mb' },
	})
}

const clientHostName = process.env.DEV
	? `${process.env.CLIENT_HOSTNAME}:5222`
	: `${process.env.CLIENT_HOSTNAME}/graphql`

app.use(cookieParser())
app.use(
	cors({
		origin: [clientHostName, 'https://studio.apollographql.com'],
		credentials: true,
	}),
)

app.get('/', (req, res) => res.send('This is experiences api graphql'))

start()

const port = process.env.PORT || 4444
app.listen(port)

export default app
