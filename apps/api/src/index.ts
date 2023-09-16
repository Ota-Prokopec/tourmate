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
	server.applyMiddleware({ app, path: '/graphql', cors: false, bodyParserConfig: { limit: '50mb' } })
}

app.use(cookieParser())
app.use(
	cors({
		origin: ['http://localhost:5222', 'https://studio.apollographql.com'],
		credentials: true,
	}),
)

app.get('/', (req, res) => res.send('This is experiences api graphql'))

start()

console.log('starfft')

app.listen(4444)

export default app
