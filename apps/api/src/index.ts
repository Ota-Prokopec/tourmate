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
	server.applyMiddleware({ app, path: '/graphql', cors: false })
}

app.use(cookieParser())
app.use(
	cors({
		origin: ['http://localhost:5222', 'https://studio.apollographql.com'],
		credentials: true,
	}),
)

start()

app.listen(4444)